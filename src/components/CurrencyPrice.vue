<script setup>
  defineProps({
    priceData: {
      type: Object,
    },
    isLoading: {
      type: Boolean,
    }
  })
</script>

<template>
  <div class="currency-price-wrapper">
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar"
    >
    </v-skeleton-loader>
    <div v-else class="full-height">
      {{ priceData?.symbol }} - {{ priceData?.price }}
    </div>
  </div>
</template>