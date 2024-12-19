<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="flex items-center justify-between">
      <button
        class="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        @click="dateStore.previousDate"
      >
        <span class="sr-only">Previous</span>
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex-1 flex divide-x divide-gray-100">
        <div v-for="(date, index) in dateList"
          :key="index"
          class="flex-1 flex flex-col items-center py-2 cursor-pointer transition-all duration-200"
          :class="[
            date.isToday ? 'bg-blue-50' : 'hover:bg-gray-50',
            date.isSelected ? 'bg-blue-100' : '',
          ]"
          @click="dateStore.selectDate(date.value); dateStore.setShowTable(true); searchStore.setHasAttemptedLoad(false)"
        >
          <div class="text-xs font-medium mb-0.5"
            :class="[
              date.isToday ? 'text-blue-600' : 'text-gray-500',
              date.isSelected ? 'text-blue-700' : ''
            ]"
          >
            {{ date.weekday }}
          </div>
          <div class="text-sm"
            :class="[
              date.isToday ? 'text-blue-600 font-semibold' : 'text-gray-700',
              date.isSelected ? 'text-blue-700 font-semibold' : ''
            ]"
          >
            {{ date.display }}
          </div>
        </div>
      </div>

      <button
        class="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        @click="dateStore.nextDate"
      >
        <span class="sr-only">Next</span>
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDateStore } from '../stores/dateStore'
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()
const dateStore = useDateStore()

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const dateList = computed(() => {
  const today = new Date()
  const dates = []
  const centerDate = new Date(dateStore.singleDate)

  for (let i = -10; i <= 10; i++) {
    const date = new Date(centerDate)
    date.setDate(date.getDate() + i)

    const isToday = date.toDateString() === today.toDateString()
    const isSelected = date.toDateString() === new Date(dateStore.singleDate).toDateString()

    dates.push({
      value: date.toISOString().split('T')[0],
      display: `${date.getMonth() + 1}/${date.getDate()}`,
      weekday: weekdays[date.getDay()],
      isToday,
      isSelected
    })
  }

  return dates
})
</script>
