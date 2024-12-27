<template>
  <div class="flex flex-col min-h-screen bg-slate-50">
    <NavBar :show-selectors="true" />
    <div class="flex-1 p-2 sm:p-4">
      <div class="max-w-full mx-2 sm:mx-4">
        <DateHeader />
        <AttemptedLoad v-if="searchStore.hasAttemptedLoad" />
        <div class="mt-6">
          <Chart v-if="dateStore.showChart" />
          <MachineScheduleTable v-if="dateStore.showTable" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Components
import NavBar from './components/NavBar.vue'
import Chart from './components/Chart.vue'
import DateHeader from './components/DateHeader.vue'
import AttemptedLoad from './components/AttemptedLoad.vue'
import MachineScheduleTable from './components/table/MachineScheduleTable.vue'

// Stores
import { useSearchStore } from './stores/searchStore'
import { useDateStore } from './stores/dateStore'

const searchStore = useSearchStore()
const dateStore = useDateStore()

onMounted(() => {
  dateStore.setShowTable(false)
  searchStore.hasAttemptedLoad = true
  dateStore.setShowChart(false)
})
</script>
