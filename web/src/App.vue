<script setup>
import DataView from './components/DataView.vue'

</script>

<template>
  <Suspense>
    <DataView />
    <template #fallback>
    Loading...
  </template>
  </Suspense>
</template>

<style scoped></style>
