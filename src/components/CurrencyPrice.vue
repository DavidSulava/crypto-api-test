<script setup>
import {ref, watch} from "vue";

  const props = defineProps({
    priceData: {
      type: Object,
    },
    isLoading: {
      type: Boolean,
    },
    className: {
      type: String,
      default: 'currency-price-wrapper',
    }
  });

  const isRed = ref(false);

  watch(() => props.priceData?.price, (newPrice, oldPrice)=>{
    isRed.value = newPrice < oldPrice;
  })
</script>

<template>
  <div :class="className">
    <div
        v-if="isLoading"
        :style="{width: 'inherit'}"
    >
      <v-skeleton-loader
          type="list-item-avatar"
      >
      </v-skeleton-loader>
    </div>
    <span
        v-else
        :class = "[isRed ? 'red-price' : 'green-price', 'price-row']"
    >
      {{ priceData?.symbol }} - {{ priceData?.price }}
    </span>
  </div>
</template>