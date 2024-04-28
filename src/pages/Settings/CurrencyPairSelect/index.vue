<script setup>
  import {computed, onMounted, onUnmounted, ref, watch} from "vue";
  import {useCurrencyPairStore} from "@/stores/currencyPair/index.js";
  import CurrencyPairHistory from "@/components/CurrencyPairHistory.vue";
  import CurrencyPrice from "@/components/CurrencyPrice.vue";
  import {SELECTED_PROPS} from "@/pages/Settings/CurrencyPairSelect/constants.js";
  import {useWebSocket} from "@vueuse/core";

  const currencyPairStore = useCurrencyPairStore();

  const selectedValue = ref(currencyPairStore.selectedPairValue || SELECTED_PROPS[0].value);
  const selectedPair = ref(null);
  const { data } = useTradeWS(selectedValue);

  onMounted(() => {
    currencyPairStore.getPair(selectedValue.value);
  });
  watch(data, () => {
    if (data.value?.length) {
      setPrice(data.value);
    }
  });

  function setPrice(data) {
    const result = JSON.parse(data);

    currencyPairStore.setPrice({
      ...currencyPairStore.price,
      price: result.p
    });
  }
  function onSelectChange(value) {
    currencyPairStore.setSelectPair(value);
    selectedPair.value = {
      title: event.target.innerText,
      value: value,
    };
    currencyPairStore.getPair(value);
  }
  //Local composable section
  function useTradeWS(selectedValue) {
    const connectionUrl = computed(() => `wss://stream.binance.com:9443/ws/${selectedValue.value.toLowerCase()}@trade`);
    const { data, open, close } = useWebSocket(connectionUrl);

    onUnmounted(() => {
      if(close) close();
    })
    watch(connectionUrl, () => {
      if(open && close) {
        close();
        open();
      }
    });

    return { data, open, close };
  }
</script>

<template>
  <div class="fill-height">
    <CurrencyPrice
        :is-loading="currencyPairStore.isDataFetching"
        :price-data="currencyPairStore.price"
    />
    <v-select
        v-model="selectedValue"
        label="Select"
        variant="outlined"
        :item-props="true"
        :items="SELECTED_PROPS"
        hide-details
        @update:modelValue="onSelectChange"
    />
    <br />
    <CurrencyPairHistory :selected-data="selectedPair" />
  </div>
</template>