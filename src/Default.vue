<template>
  <div class="flex flex-col min-h-screen bg-slate-50">
    <NavBar />
    <div class="flex-1 p-2 sm:p-4">
      <div class="max-w-full mx-2 sm:mx-4">
        <Search :showMachine="true" :showProductLine="true" :showCustomer="true" :showPackingDate="true"
          :showOrderNumber="true" />
        <PaddingTable v-if="searchStore.showTable" />
        <AttemptedLoad />
        <WorkTimeTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import PaddingTable from './components/table/PaddingTable.vue'
import Search from './components/Search.vue'
import { useSearchStore } from './stores/searchStore'
import AttemptedLoad from './components/AttemptedLoad.vue'
import WorkTimeTable from './components/table/WorkTimeTable.vue'

const searchStore = useSearchStore()

// 在組件掛載時重置表格顯示狀態
onMounted(() => {
  searchStore.showTable = false
  searchStore.hasAttemptedLoad = true
})
</script>
