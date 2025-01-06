<template>
  <div class="app-container">
    <NavBar />
    <div class="main-content">
      <div class="content-wrapper">
        <Search :showMachine="true" :showProductLine="true" :showCustomer="true" :showPackingDate="true"
          :showOrderNumber="true" :showReset="true" />
        <PaddingTable v-if="searchStore.showTable" />
        <AttemptedLoad />
        <WorkTimeTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSearchStore } from './stores/searchStore'
import { useProductLineStore } from '@/stores/productLineStore'

import NavBar from './components/NavBar.vue'
import Search from './components/Search.vue'
import AttemptedLoad from './components/AttemptedLoad.vue'
import PaddingTable from './components/table/PaddingTable.vue'
import WorkTimeTable from './components/table/WorkTimeTable.vue'

const searchStore = useSearchStore()
const productLineStore = useProductLineStore()

// 在組件掛載時重置表格顯示狀態
onMounted(() => {
  searchStore.showTable = false
  searchStore.hasAttemptedLoad = true
})

onMounted(async () => {
  if (!productLineStore.isInitialized) {
    console.log('Initializing product lines from Default page')
    await productLineStore.fetchProductLines()
  }
})
</script>
