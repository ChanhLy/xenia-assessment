<script setup>
import DataTable from './DataTable.vue'
import DataForm from './DataForm.vue'
import { ref } from 'vue'

const data = ref([]);
data.value = await (await fetch('/api/data')).json()
</script>

<template>
  <DataForm @update="data = $event" />
  <DataTable :rows="data" @update="data = $event"/>
</template>