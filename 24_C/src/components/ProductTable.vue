<template>
  <div class="card">
    <div class="toolbar">
      <span>数据来源: <code>Northwind OData V2</code></span>
      <button @click="reload" :disabled="loading">{{ loading ? '加载中...' : '刷新' }}</button>
    </div>
    <table class="grid" v-if="!error">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
            <th>包装规格</th>
          <th>单价</th>
          <th>库存</th>
          <th>停产?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.ProductID">
          <td>{{ p.ProductID }}</td>
          <td>{{ p.ProductName }}</td>
          <td>{{ p.QuantityPerUnit }}</td>
          <td>{{ formatPrice(p.UnitPrice) }}</td>
          <td>{{ p.UnitsInStock }}</td>
          <td>
            <span :class="p.Discontinued ? 'tag stop' : 'tag ok'">{{ p.Discontinued ? '是' : '否' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const loading = ref(false);
const error = ref('');

// 使用本地 devServer 代理，避免 CORS
const endpoint = '/api/products';

function formatPrice(v){
  if (v == null) return '';
  return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(v);
}

async function load(){
  loading.value = true;
  error.value = '';
  try {
    const { data } = await axios.get(endpoint, { headers: { 'Accept': 'application/json' }});
    if (!data || !Array.isArray(data.d)) {
      throw new Error('响应格式不符合预期');
    }
    products.value = data.d;
  } catch (e) {
    error.value = e.message || String(e);
  } finally {
    loading.value = false;
  }
}

function reload(){
  load();
}

onMounted(load);
</script>

<style scoped>
.card { background:#fff; border:1px solid #ddd; border-radius:6px; padding:1rem; box-shadow:0 2px 4px rgba(0,0,0,.06); }
.toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem; font-size:.875rem; }
button { cursor:pointer; padding:0.4rem 0.8rem; border:1px solid #409eff; background:#409eff; color:#fff; border-radius:4px; font-size:.875rem; }
button:disabled { opacity:.6; cursor:default; }
.grid { width:100%; border-collapse:collapse; font-size:14px; }
.grid th, .grid td { padding:6px 8px; border:1px solid #e5e5e5; text-align:left; }
.grid th { background:#f7f7f7; }
.tag { display:inline-block; padding:2px 6px; border-radius:3px; font-size:12px; color:#fff; }
.tag.ok { background:#67c23a; }
.tag.stop { background:#f56c6c; }
.error { color:#f56c6c; font-weight:600; }
</style>
