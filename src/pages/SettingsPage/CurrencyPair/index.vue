<script setup>
  import {computed, onMounted, ref, watch} from "vue";
  import {useCurrencyPairStore} from "@/stores/currencyPair/index.js";
  import CurrencyPairHistory from "@/pages/SettingsPage/CurrencyPairHistory/index.vue";
  import CurrencyPrice from "@/pages/SettingsPage/CurrencyPrice/index.vue";
  import {SELECTED_PROPS} from "@/pages/SettingsPage/CurrencyPair/constants.js";
  import useBinanceWS from "@/composables/useBinanceWS.js";

  const currencyPairStore = useCurrencyPairStore();

  const selectedPair = ref(null);
  const selectedPairValue = ref(currencyPairStore.selectedPair.value);
  const { data } = useBinanceWS(selectedPairValue);

  onMounted(() => {
    currencyPairStore.getPair(currencyPairStore.selectedPair.value);
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
    const data = structuredClone(SELECTED_PROPS.find(item => item.value === value));
    currencyPairStore.setSelectPair(data);
    selectedPair.value = {
      title: event.target.innerText,
      value: value,
    };

    currencyPairStore.getPair(value);
  }
</script>

<template>
  <div class="fill-height">
    <CurrencyPrice
        :is-loading="currencyPairStore.isDataFetching"
        :price-data="currencyPairStore.price"
        :icon-url="currencyPairStore?.selectedPair?.iconUrl"
    />
    <v-select
        v-model="currencyPairStore.selectedPair.value"
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