<script setup>
  import {useCurrencyPairStore} from "@/stores/currencyPair/index.js";
  import {ref, watch} from "vue";
  import dayjs from "dayjs";

  const props = defineProps({
    selectedData: {
      type: Object,
    }
  })
  const currencyPairStore = useCurrencyPairStore();

  const tableOptions = ref({
    sortBy: [{ key: 'timeStamp', order:'desc'}],
    headers: [
      { title: 'Name', key: 'name' },
      { title: 'Time', key: 'timeStamp' },
    ]
  })

  watch(() => props.selectedData, (newData) => {
    currencyPairStore.addToHistory({
      ...newData,
      timeStamp: Date.now(),
    });
  });
</script>

<template>
  <div v-if="currencyPairStore.history.length">
    <div>History</div>
    <br>
    <v-data-table-virtual
        v-model:sort-by="tableOptions.sortBy"
        :headers="tableOptions.headers"
        :items="currencyPairStore.history"
        height="500px"
        fixed-header
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ dayjs(item.timeStamp).format('DD.MM.YYYY - HH:mm:ss') }}</td>
        </tr>
      </template>
      <template #bottom />
    </v-data-table-virtual>
  </div>
</template>