<script setup>
  import '@/styles/pages/settings.less';
  import CurrencyPairSelect from "@/components/CurrencyPairSelect/index.vue";
</script>

<template>
  <div class="settings-page-wrapper">
    <h4>Select Pair</h4>
    <br />
    <CurrencyPairSelect />
  </div>
</template>