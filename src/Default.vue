<template>
  <div class="flex flex-col min-h-screen bg-slate-50">
    <NavBar />
    <div class="flex-1 p-2 sm:p-4">
      <div class="max-w-full mx-2 sm:mx-4">
        <Search :showMachine="true" :showProductLine="true" :showCustomer="true" :showScheduleDate="true"
          :showPackingDate="true" :showOrderNumber="true" />
        <PaddingTable v-if="searchStore.showTable" />
        <AttemptedLoad />
        <!-- 機台表格部分 -->
        <div class="mt-8">
          <div class="hidden 2xl:block">
            <div class="overflow-x-auto bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
              <!-- 表格內容 -->
              <table class="min-w-full divide-y divide-gray-300">
                <!-- 表頭 -->
                <thead>
                  <tr class="bg-gradient-to-r from-zinc-700 via-gray-800 to-slate-900">
                    <th scope="col" class="w-24 px-3 py-3.5 text-left text-sm font-semibold text-white">
                      機台
                    </th>
                    <th v-for="date in dates" :key="date" scope="col"
                      class="w-24 px-3 py-3.5 text-center text-sm font-semibold text-white">
                      {{ date }}
                    </th>
                  </tr>
                </thead>
                <!-- 表身 -->
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="machine in machines" :key="machine" class="hover:bg-gray-50">
                    <td class="px-3 py-4 text-sm text-gray-900">
                      {{ machine }}
                    </td>
                    <td v-for="date in dates" :key="date" class="px-3 py-4 text-center text-sm">
                      <div class="text-blue-600 font-medium">
                        0小時
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import NavBar from './components/NavBar.vue'
import PaddingTable from './components/table/PaddingTable.vue'
import Search from './components/Search.vue'
import { useSearchStore } from './stores/searchStore'
import AttemptedLoad from './components/AttemptedLoad.vue'

const searchStore = useSearchStore()

// 在組件掛載時重置表格顯示狀態
onMounted(() => {
  searchStore.showTable = false
  searchStore.hasAttemptedLoad = true
})

// 簡化機台列表
const machines = ref(['3-WS02', '3-WS03', '3-WS04', '3-WS05'])

// 生成日期範圍
const generateDates = () => {
  const dates = []
  const startDate = dayjs('2023-12-19') // 設定起始日期

  // 生成14天的日期
  for (let i = 0; i < 14; i++) {
    const date = startDate.add(i, 'day')
    dates.push(date.format('MM/DD'))
  }

  return dates
}

// 使用 computed 屬性來生成日期
const dates = computed(() => generateDates())
</script>
