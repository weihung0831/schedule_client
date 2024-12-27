<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="flex items-center">
      <button
        class="flex-none p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        @click="previousWeek"
      >
        <span class="sr-only">Previous</span>
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex-1 overflow-hidden">
        <div ref="scrollContainer" class="flex overflow-x-auto scrollbar-hide scroll-smooth">
          <div v-for="(date, index) in dateList"
            :key="index"
            :ref="date.isSelected ? setSelectedRef : undefined"
            class="flex-none w-[5rem] flex flex-col items-center justify-center py-2 cursor-pointer transition-all duration-200"
            :class="[
              date.isToday ? 'bg-blue-50' : 'hover:bg-gray-50',
              date.isSelected ? 'bg-blue-100' : '',
            ]"
            @click="selectDate(date)"
          >
            <div class="text-xs font-medium whitespace-nowrap min-w-[3rem] text-center"
              :class="[
                date.isToday ? 'text-blue-600' : 'text-gray-500',
                date.isSelected ? 'text-blue-700' : ''
              ]"
            >
              {{ date.weekday }}
            </div>
            <div class="text-sm font-medium whitespace-nowrap min-w-[3.5rem] text-center"
              :class="[
                date.isToday ? 'text-blue-600 font-semibold' : 'text-gray-700',
                date.isSelected ? 'text-blue-700 font-semibold' : ''
              ]"
            >
              {{ date.display }}
            </div>
          </div>
        </div>
      </div>

      <button
        class="flex-none p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        @click="nextWeek"
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
import {
  ref,
  computed,
  onMounted,
  nextTick
} from 'vue'
import { useDateStore } from '../stores/dateStore'
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()
const dateStore = useDateStore()
const scrollContainer = ref(null)
const selectedRef = ref(null)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const dateList = computed(() => {
  const today = new Date()
  const dates = []
  const selectedDate = new Date(dateStore.singleDate)

  // 生成前後各15天的日期
  for (let i = -15; i <= 15; i++) {
    const date = new Date(selectedDate)
    date.setDate(selectedDate.getDate() + i)

    const isToday = date.toDateString() === today.toDateString()
    const isSelected = date.toDateString() === selectedDate.toDateString()

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

const setSelectedRef = (el) => {
  if (el) selectedRef.value = el
}

const scrollToSelected = async () => {
  await nextTick()
  if (selectedRef.value && scrollContainer.value) {
    const container = scrollContainer.value
    const element = selectedRef.value
    const containerWidth = container.offsetWidth
    const elementWidth = element.offsetWidth
    const scrollLeft = element.offsetLeft - (containerWidth / 2) + (elementWidth / 2)
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }
}

const selectDate = (date) => {
  dateStore.selectDate(date.value)
  dateStore.setShowTable(true)
  dateStore.setShowChart(true)
  searchStore.setHasAttemptedLoad(false)
}

const previousWeek = () => {
  const currentDate = new Date(dateStore.singleDate)
  currentDate.setDate(currentDate.getDate() - 1)
  dateStore.selectDate(currentDate.toISOString().split('T')[0])
  scrollToSelected()
}

const nextWeek = () => {
  const currentDate = new Date(dateStore.singleDate)
  currentDate.setDate(currentDate.getDate() + 1)
  dateStore.selectDate(currentDate.toISOString().split('T')[0])
  scrollToSelected()
}

// 初始化時滾動到選中的日期
onMounted(() => {
  scrollToSelected()
})
</script>
