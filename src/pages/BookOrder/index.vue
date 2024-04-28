<script setup>
  import '@/styles/pages/book-order.less';
  import {onMounted, ref, watch} from "vue";
  import {SELECTED_PROPS} from "@/pages/Settings/CurrencyPairSelect/constants.js";
  import {useCurrencyPairStore} from "@/stores/currencyPair/index.js";
  import {useBookOrderStore} from "@/stores/bookOrder/index.js";
  import BookTable from "@/components/BookTable/index.vue";

  const bookOrderStore = useBookOrderStore();

  const selectedLimit = ref(100);
  const { computedSelectedCurrencyPair, getBookOrder } = useGetSnapshot(selectedLimit);
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

  function useGetSnapshot(limitRef) {
    const {selectedPairValue} = useCurrencyPairStore();

    const computedSelectedCurrencyPair = ref(SELECTED_PROPS.find(item => item.value === selectedPairValue) || SELECTED_PROPS[0]);

    onMounted(() => {
      getBookOrder();
    });

    function getBookOrder() {
      bookOrderStore.getBookOrder({
        symbol: computedSelectedCurrencyPair.value.value,
        limit: limitRef.value,
      });
    }

    return {
      computedSelectedCurrencyPair,
      getBookOrder,
    }
  }
</script>

<template>
  <div class="book-order-wrapper">
    <h3>
      {{ computedSelectedCurrencyPair.title }}
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