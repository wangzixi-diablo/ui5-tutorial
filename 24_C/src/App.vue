<template>
  <div class="layout">
    <h1>Northwind Products (Top 10)</h1>
    <ProductTable />
  </div>
</template>

<script setup>
import ProductTable from './components/ProductTable.vue';
</script>

<style scoped>
.layout { padding: 1.25rem; font-family: system-ui, Arial, sans-serif; }
</style>
