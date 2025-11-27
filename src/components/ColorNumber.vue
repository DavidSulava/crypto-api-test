<script setup>
  import {computed, ref, watch} from 'vue';

  const props = defineProps({
    value: {
      type: [Number, String],
    },
  });

  const isRed = ref(false);
  const isSameNumber = ref(true);

  const colorClassName = computed(() => isSameNumber.value ? '' : isRed.value ? 'red-number' : 'green-number');

  watch(() => props.value, (newPrice, oldPrice)=>{
    isSameNumber.value = newPrice === oldPrice;
    isRed.value = newPrice < oldPrice;
  })
</script>

<template>
   <span
       :class = "[colorClassName]"
   >
    {{ value }}
  </span>
</template>