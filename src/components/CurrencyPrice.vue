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
  <div>
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar"
    >
    </v-skeleton-loader>
    <template v-else>
      {{ priceData?.symbol }} - {{ priceData?.price }}
    </template>
  </div>
</template>