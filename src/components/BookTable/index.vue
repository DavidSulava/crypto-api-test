<script setup>
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
      items-per-page-text-info="0"
      items-per-page-text="per page"
  >
    <template #header.total="{column}">
          <span class="hide-on-mobile">
            {{ column.title }}
          </span>
    </template>
    <template #item="{ item }">
      <tr>
        <td>{{ parseFloat(item[0]).toFixed(2) }}</td>
        <td>{{ parseFloat(item[1]).toFixed(2) }}</td>
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