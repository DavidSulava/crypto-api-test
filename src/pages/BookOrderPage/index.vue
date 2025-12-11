<script setup>
  import '@/styles/pages/book-order.less';
  import {onMounted, onUnmounted, ref, watch} from "vue";
  import {useCurrencyPairStore} from '@/stores/currencyPair/index.js';
  import {useBookOrderStore} from '@/stores/bookOrder/index.js';
  import BookTable from '@/pages/BookOrderPage/BookTable/index.vue';
  import useBinanceWS from '@/composables/useBinanceWS.js';

  const bookOrderStore = useBookOrderStore();

  const selectedLimit = ref(100);
  const eventCount = ref(0);
  const prev_u = ref(0);
  const { selectedPair, getBookOrder } = useGetSnapshot(selectedLimit);
  const { data } = useBinanceWS(selectedPair, '@depth');
  const tableOptions = ref({
    sortBy: [{ key: 'timeStamp', order:'desc'}],
    headers: [
      { title: 'Price', key: 'Price' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Total', key: 'total', align: 'hide-on-mobile', },
    ],
    limitList: [
      { value: 100, title: '100' },
      { value: 500, title: '500' },
      { value: 1000, title: '1000' },
    ],
  })

  watch(selectedLimit, () => {
    if (getBookOrder) {
      getBookOrder();
    }
  })
  watch(data, () => {
    if (data.value?.length) {
      updateQuantity(data.value);
    }
  });
  onUnmounted(() => {
    bookOrderStore.setBookOrder([])
  })

  function updateQuantity(data) {
    //https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#how-to-manage-a-local-order-book-correctly
    const result = JSON.parse(data);

    if (!result.u || !bookOrderStore.bookOrderList?.lastUpdateId) return;
    if (result.u <= bookOrderStore.bookOrderList.lastUpdateId) return;
    if (prev_u.value && result.U !== prev_u.value + 1) return;

    // Обновление только при прохождении всех проверок
    result.a.forEach(item => {
      const quantity = parseFloat(item[1]);
      if (quantity) {
        bookOrderStore.updateBookOrder('asks', [parseFloat(item[0]), quantity]);
      }
    });

    result.b.forEach(item => {
      const quantity = parseInt(item[1]);
      if (quantity) {
        bookOrderStore.updateBookOrder('bids', [parseInt(item[0]), quantity]);
      }
    });
    eventCount.value++;
    prev_u.value = result.u;
  }
  //Local composable section
  function useGetSnapshot(limitRef) {
    const {selectedPair} = useCurrencyPairStore();

    onMounted(() => {
      getBookOrder();
    });

    function getBookOrder() {
      bookOrderStore.getBookOrder({
        symbol: selectedPair?.value,
        limit: limitRef.value,
      });
    }

    return {
      selectedPair,
      getBookOrder,
    }
  }
</script>

<template>
  <div class="book-order-wrapper">
    <h3>
      {{ selectedPair.title }}
    </h3>
    <br>
    <div
        v-if="bookOrderStore.bookOrderList?.asks && bookOrderStore.bookOrderList?.bids"
        class="table-wrapper"
    >
     <div>
       <div>Asks</div>
       <BookTable
           v-model:selected-limit="selectedLimit"
           :tableOptions="tableOptions"
           :loading="bookOrderStore.isBookDataFetching"
           :items="bookOrderStore.bookOrderList.asks"
       />
     </div>

      <div>
        <div>Bids</div>
        <BookTable
            v-model:selected-limit="selectedLimit"
            :tableOptions="tableOptions"
            :loading="bookOrderStore.isBookDataFetching"
            :items="bookOrderStore.bookOrderList.bids"
        />
      </div>
    </div>
  </div>
</template>