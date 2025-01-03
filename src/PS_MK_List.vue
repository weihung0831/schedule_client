<template>
  <div class="page-container">
    <NavBar />
    <div class="page-content">
      <div class="page-content-wrapper">
        <DateHeader />
        <!-- 生產表格區域 -->
        <div class="schedule-section">
          <TotalScheduleTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDateStore } from './stores/dateStore'
import DateHeader from './components/DateHeader.vue'
import NavBar from './components/NavBar.vue'
import TotalScheduleTable from './components/table/TotalScheduleTable.vue'

const dateStore = useDateStore()
</script>
