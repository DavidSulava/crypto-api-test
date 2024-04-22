<script setup>
  import {computed, onMounted, onUnmounted, ref, watch} from "vue";
  import {useCurrencyPairStore} from "@/stores/currencyPair/index.js";
  import CurrencyPairHistory from "@/components/CurrencyPairHistory.vue";
  import CurrencyPrice from "@/components/CurrencyPrice.vue";
  import {SELECTED_PROPS} from "@/components/CurrencyPairSelect/constants.js";
  import {useWebSocket} from "@vueuse/core";

  defineProps({
    isDisabled: {
      type: Boolean,
      default: false,
    },
  })

  const currencyPairStore = useCurrencyPairStore();

  const selectedValue = ref(currencyPairStore.selectedPairValue || SELECTED_PROPS[0].value);
  const selectedPair = ref(null);
  const { data, open, close } = useTradeWS(selectedValue, 10);

  onMounted(() => {
    currencyPairStore.getPair(selectedValue.value);
  });
  onUnmounted(() => {
    if(close) close();
  })

  watch(data, () => {
    if (data.value?.length) {
      const result = JSON.parse(data.value);
      currencyPairStore.setPrice({
        ...currencyPairStore.price,
        price: result.p
      });
    }
  });

  function onSelectChange(value) {
    currencyPairStore.setSelectPair(value);
    selectedPair.value = {
      title: event.target.innerText,
      value: value,
    };
    currencyPairStore.getPair(value);

    if(open && close) {
      close();
      open();
    }
  }
  function useTradeWS(selectedValue, depth = 10) {
    const connectionUrl = computed(() => `wss://stream.binance.com:9443/ws/${selectedValue.value.toLowerCase()}@trade`);
    const { data, open, close } = useWebSocket(connectionUrl);

    return { data, open, close };
  }
</script>

<template>
  <div class="fill-height">
    <v-select
        v-model="selectedValue"
        label="Select"
        variant="outlined"
        :item-props="true"
        :items="SELECTED_PROPS"
        :disabled="isDisabled"
        hide-details
        @update:modelValue="onSelectChange"
    />

    <CurrencyPrice
      :is-loading="currencyPairStore.isDataFetching"
      :price-data="currencyPairStore.price"
    />
    <br />
    <CurrencyPairHistory :selected-data="selectedPair" />
  </div>
</template>