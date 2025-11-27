<script setup>
  import ColorPrice from '@/components/ColorNumber.vue';

  defineProps({
    items: Array,
    tableOptions: Object,
    loading: {
      type: Boolean,
      default: false
    },
  });

  const selectedLimit = defineModel('selectedLimit');
</script>

<template>
    <v-data-table
      v-model:items-per-page="selectedLimit"
      fixed-header
      :headers="tableOptions.headers"
      :items="items"
      :loading="loading"
      :itemsPerPageOptions="tableOptions.limitList"
  >
    <template #header.total="{column}">
        <span class="hide-on-mobile">
          {{ column.title }}
        </span>
    </template>
    <template #item="{ item }">
      <tr>
        <td>{{ parseFloat(item[0]).toFixed(4) }}</td>
        <td>
          <ColorPrice
              :value="parseFloat(item[1]).toFixed(5)"
              :key="item[0]"
          />
        </td>
        <td class="hide-on-mobile">{{ parseFloat(item[0]) * parseFloat(item[1]) }}</td>
      </tr>
    </template>
    <template v-slot:bottom>
      <v-select
          v-model="selectedLimit"
          label="Select"
          density="compact"
          variant="solo"
          :items="tableOptions.limitList"
          hide-details
          flat
      />
    </template>
  </v-data-table>
</template>