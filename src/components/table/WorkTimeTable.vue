<template>
  <div class="mt-4">
    <div class="work-time-date-selector">
      <button @click="previousWeek" class="work-time-nav-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="work-time-date-range">{{ startDate }} - {{ endDate }}</div>
      <button @click="nextWeek" class="work-time-nav-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="work-time-table-container">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr class="work-time-header">
              <th scope="col" class="work-time-header-cell">機台</th>
              <th
                v-for="date in displayDates"
                :key="date.value"
                scope="col"
                class="work-time-date-cell"
              >
              {{ date.label }} {{ date.weekday }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="machine in workTimeData" :key="machine.id" class="hover:bg-gray-50">
              <td class="work-time-machine-cell">{{ machine.name }}</td>
              <td v-for="date in displayDates" :key="date.value" class="px-3 py-4 text-center">
                <div class="work-time-hours">{{ machine.hours[date.value] || '0' }}小時</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'

dayjs.locale('zh-tw')

// 當前週的起始日期
const currentWeekStart = ref(dayjs().startOf('week'))

// 計算顯示的日期範圍
const displayDates = computed(() => {
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = currentWeekStart.value.add(i, 'day')
    dates.push({
      value: date.format('YYYY-MM-DD'),
      label: date.format('MM/DD'),
      weekday: date.format('ddd')
    })
  }
  return dates
})

// 格式化顯示的日期範圍
const startDate = computed(() => currentWeekStart.value.format('YYYY/MM/DD'))
const endDate = computed(() => currentWeekStart.value.add(6, 'day').format('YYYY/MM/DD'))

// 切換週次
const previousWeek = () => {
  currentWeekStart.value = currentWeekStart.value.subtract(1, 'week')
}

const nextWeek = () => {
  currentWeekStart.value = currentWeekStart.value.add(1, 'week')
}

// 工時數據結構
const createEmptyHours = () => {
  const hours = {}
  displayDates.value.forEach(date => {
    hours[date.value] = 0
  })
  return hours
}

const workTimeData = ref([
  { id: 1, name: '3-WS01', hours: createEmptyHours() },
  { id: 2, name: '3-WS02', hours: createEmptyHours() },
  { id: 3, name: '3-WS03', hours: createEmptyHours() },
  { id: 4, name: '3-WS04', hours: createEmptyHours() },
  { id: 5, name: '3-WS05', hours: createEmptyHours() }
])
</script>
