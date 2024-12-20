<template>
  <div class="mt-4">
    <!-- 日期選擇器 -->
    <div
      class="sticky top-0 z-10 px-4 py-2 flex items-center justify-between">
      <button @click="previousWeek" class="p-1.5 text-gray-500 hover:text-gray-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="text-sm font-medium text-gray-900">{{ startDate }} - {{ endDate }}</div>
      <button @click="nextWeek" class="p-1.5 text-gray-500 hover:text-gray-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- 平板和電腦版表格 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr class="bg-gradient-to-r from-zinc-700 via-gray-800 to-slate-900">
              <th scope="col"
                class="w-32 px-3 py-3.5 text-left text-sm font-semibold text-white sticky left-0 bg-gradient-to-r from-zinc-700 via-gray-800 to-slate-900">
                機台
              </th>
              <th v-for="date in displayDates" :key="date.value" scope="col"
                class="w-24 px-3 py-3.5 text-center text-sm font-semibold text-white">
                <div>{{ date.label }}</div>
                <div class="text-xs text-gray-300">{{ date.weekday }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="machine in workTimeData" :key="machine.id" class="hover:bg-gray-50">
              <td class="px-3 py-4 text-sm text-gray-900 font-medium sticky left-0 bg-white border-r border-gray-200">
                {{ machine.name }}
              </td>
              <td v-for="date in displayDates" :key="date.value" class="px-3 py-4 text-center">
                <div class="text-blue-600 text-sm">
                  {{ machine.hours[date.value] || '0' }}小時
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
