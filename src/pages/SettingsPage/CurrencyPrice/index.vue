<script setup>
  import ColorPrice from '@/components/ColorNumber.vue';

  defineProps({
    priceData: {
      type: Object,
    },
    isLoading: {
      type: Boolean,
    },
    className: {
      type: String,
      default: 'currency-price-wrapper',
    },
    iconUrl: {
      type: String,
    }
  });
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
        class="d-flex"
    >
      <v-img
          v-if="iconUrl"
          class="mr-2"
          aspect-ratio="1"
          :width="25"
          :height="25"
          :src='iconUrl'
      />
      <span v-else>
        {{ priceData?.symbol }} -
      </span>
      <ColorPrice :value="priceData?.price"/>
    </span>
  </div>
</template>