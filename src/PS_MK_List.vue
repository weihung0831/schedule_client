<template>
  <div class="flex flex-col min-h-screen bg-slate-50">
    <NavBar />
    <div class="flex-1 p-2 sm:p-4">
      <div class="max-w-full mx-2 sm:mx-4">
        <DateHeader />
        <!-- 生產表格區域 -->
        <div class="mt-6">
          <TotalScheduleTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import TotalScheduleTable from './components/table/TotalScheduleTable.vue'
import DateHeader from './components/DateHeader.vue'
import { useDateStore } from './stores/dateStore'

const dateStore = useDateStore()
</script>
