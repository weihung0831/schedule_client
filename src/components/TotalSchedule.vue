<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { Disclosure } from '@headlessui/vue';
import JsonExcel from 'vue-json-excel3'
import { totalScheduleTableHeader, errorToast } from '@/utils';
import { getSchedulesApi } from '@/api';

dayjs.locale('zh-tw')

const singleDate = ref(dayjs().format('YYYY-MM-DD'))

// 排序相關狀態
const sortField = ref('index')
const sortOrder = ref('desc')
const showTable = ref(false)
const showExcel = ref(true)
const showNoSearch = ref(false)

// 處理排序
const handleSort = (field) => {
  if (sortField.value === field) {
    // 如果點擊同一個欄位，切換排序順序
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // 如果點擊不同欄位，設置新的排序欄位並預設升序
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

// 排序後的資料
const sortedScheduleData = computed(() => {
  if (!sortField.value || !scheduleData.value) return scheduleData.value

  return [...scheduleData.value].sort((a, b) => {
    // 處理次序欄位的特殊情況
    if (sortField.value === 'index') {
      const aIndex = scheduleData.value.indexOf(a) + 1
      const bIndex = scheduleData.value.indexOf(b) + 1
      return sortOrder.value === 'asc' ? aIndex - bIndex : bIndex - aIndex
    }

    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // 處理數字型別的欄位
    const numericFields = ['plan_qty', 'actual_qty', 'changed_schedule_qty', 'changed_manual_work_hours', 'erp_work_hours', 'stock']
    if (numericFields.includes(sortField.value)) {
      aValue = Number(aValue) || 0
      bValue = Number(bValue) || 0
    }

    // 比較值
    if (aValue === bValue) return 0
    const comparison = aValue > bValue ? 1 : -1
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// 計算序號
const getSequenceNumber = (index) => {
  return index + 1
}

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const scrollContainer = ref(null)
const selectedRef = ref(null)

// 計算日期列表
const dateList = computed(() => {
  const today = dayjs()
  const selectedDate = dayjs(singleDate.value)
  const dates = []

  for (let i = -15; i <= 15; i++) {
    const date = selectedDate.add(i, 'day')
    dates.push({
      value: date.format('YYYY-MM-DD'),
      display: date.format('M/D'),
      weekday: weekdays[date.day()],
      isToday: date.isSame(today, 'day'),
      isSelected: date.isSame(selectedDate, 'day')
    })
  }

  return dates
})

const scheduleData = ref([])

async function fetchScheduleData() {
  try {
    const res = await getSchedulesApi(singleDate.value)

    if (res.status === 200) {
      scheduleData.value = res.data.data
      showTable.value = true
      showNoSearch.value = false
      showExcel.value = true

      if (res.data.data.length === 0) {
        showTable.value = false
        showExcel.value = false
        showNoSearch.value = true
      }
    }
  } catch (error) {
    console.log(error)
    errorToast('連線錯誤')
    showExcel.value = false
  }
}

// 處理日期選擇
const selectDate = async (date) => {
  showTable.value = false
  showExcel.value = false

  singleDate.value = date.value
  singleDate.value = dayjs(singleDate.value).format('YYYYMMDD')

  await fetchScheduleData()
}

// 切換到前一天
const previousWeek = async () => {
  showTable.value = false
  showExcel.value = false

  singleDate.value = dayjs(singleDate.value).subtract(1, 'day').format('YYYY-MM-DD')
  await fetchScheduleData()
  scrollToSelected()
}

// 切換到後一天
const nextWeek = async () => {
  showTable.value = false
  showExcel.value = false

  singleDate.value = dayjs(singleDate.value).add(1, 'day').format('YYYY-MM-DD')
  await fetchScheduleData()
  scrollToSelected()
}

// 設置選中的參考元素
const setSelectedRef = (el) => {
  if (el) selectedRef.value = el
}

// 滾動到選中日期
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

// 初始化時滾動到選中的日期
onMounted(() => {
  showExcel.value = false
  scrollToSelected()
  fetchScheduleData()
})

// 註冊 download-excel 組件
const downloadExcel = JsonExcel

// Excel 匯出相關
const currentDate = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
})

// const exportFields = {
//   '機台': 'machine_name',
//   '包裝日': 'packing_date',
//   '客戶代號': 'customer_code',
//   '訂單號碼': 'order_number',
//   '訂單序號': 'order_spec',
//   '品號': 'product_number',
//   '品名-規格': 'product_name',
//   '預計產量': 'plan_qty',
//   '已生產數': 'actual_qty',
//   '排產數量': 'changed_schedule_qty',
//   '手動工時': 'manual_work_hours',
//   'ERP工時': 'erp_work_hours',
//   '庫存': 'stock',
//   '製令單號': 'manufacturing_number'
// }

const exportData = computed(() => scheduleData.value)

// 表頭資料
const headerData = totalScheduleTableHeader

// 取得欄位寬度
const getColumnWidth = (key) => {
  const widthMap = {
    'machine_name': '12',
    'packing_date': '20',
    'customer_code': '24',
    'order_number': '24',
    'order_spec': '20',
    'product_number': '32',
    'product_name': '32',
    'plan_qty': '24',
    'actual_qty': '24',
    'changed_schedule_qty': '32',
    'changed_manual_work_hours': '32',
    'erp_work_hours': '24',
    'stock': '24',
    'manufacturing_number': '32'
  }
  return widthMap[key] || '12'
}
</script>

<template>
  <div class="page-container">
    <Disclosure as="nav" class="nav-container">
      <div class="nav-inner">
        <div class="nav-header">
          <div class="nav-brand">
            <div class="nav-logo">
              <a href="/schedule/PendingSchedule">
                <img class="nav-logo-image" src="http://192.168.199.166/APS3/img/logo.png?color=indigo&shade=600"
                  alt="Your Company" />
              </a>
            </div>
            <div class="nav-desktop-links">
              <router-link to="/PendingSchedule" class="nav-link" active-class="nav-link-active">未排程</router-link>
              <router-link to="/MachineSchedule" class="nav-link" active-class="nav-link-active">機台排程</router-link>
              <router-link to="/TotalSchedule" class="nav-link" active-class="nav-link-active">總排程</router-link>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <div class="page-content">
      <div class="page-content-wrapper">
        <div class="date-header">
          <div class="date-nav">
            <button class="date-nav-button" @click="previousWeek">
              <span class="sr-only">Previous</span>
              <svg class="date-nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div class="date-scroll">
              <div ref="scrollContainer" class="date-scroll-container scrollbar-hide">
                <div v-for="(date, index) in dateList" :key="index" :ref="date.isSelected ? setSelectedRef : undefined"
                  :class="[
                    'date-item',
                    date.isToday ? 'date-item-today' : 'hover:bg-gray-50',
                    date.isSelected ? 'date-item-selected' : '',
                  ]" @click="selectDate(date)">
                  <div :class="[
                    'date-weekday',
                    date.isToday ? 'date-weekday-today' : 'text-gray-500',
                    date.isSelected ? 'date-weekday-selected' : ''
                  ]">
                    {{ date.weekday }}
                  </div>
                  <div :class="[
                    'date-display',
                    date.isToday ? 'date-display-today' : 'text-gray-700',
                    date.isSelected ? 'date-display-selected' : ''
                  ]">
                    {{ date.display }}
                  </div>
                </div>
              </div>
            </div>

            <button class="date-nav-button" @click="nextWeek">
              <span class="sr-only">Next</span>
              <svg class="date-nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="schedule-section">
          <div class="schedule-export-wrapper">
            <download-excel :data="exportData" :fields="headerData.value" type="xlsx" worksheet="Schedule"
              :name="`排程資料_${currentDate}.xlsx`" class="excel-export-button" v-if="showExcel">
              <svg class="excel-export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
              匯出 Excel
            </download-excel>
          </div>

          <div class="attempted-load-container" v-if="showNoSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
              <mask id="lineMdFileDocumentRemove0">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path stroke-dasharray="64" stroke-dashoffset="64"
                    d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
                  </path>
                  <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
                    <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s"
                      values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
                    <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
                  </path>
                  <path stroke-dasharray="8" stroke-dashoffset="8" d="M9 13h6">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0" />
                  </path>
                  <path stroke-dasharray="4" stroke-dashoffset="4" d="M9 17h3">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="4;0" />
                  </path>
                  <path fill="#000" fill-opacity="0" stroke="none"
                    d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z">
                    <set fill="freeze" attributeName="fill-opacity" begin="1.2s" to="1" />
                  </path>
                  <path stroke-dasharray="8" stroke-dashoffset="8" d="M17 17l4 4">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="8;0" />
                  </path>
                  <path stroke-dasharray="8" stroke-dashoffset="8" d="M21 17l-4 4">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.4s" dur="0.2s" values="8;0" />
                  </path>
                </g>
              </mask>
              <rect width="24" height="24" fill="currentColor" mask="url(#lineMdFileDocumentRemove0)" />
            </svg>
            <span>查無資料</span>
          </div>

          <div class="table-section">
            <div class="schedule-table-container" v-if="showTable">
              <table class="schedule-table">
                <thead>
                  <tr class="schedule-table-header">
                    <th scope="col" class="schedule-header-cell w-12">
                      <div class="schedule-header-content">
                        <div class="group inline-flex cursor-pointer ml-2" @click="handleSort('index')">
                          次序
                          <span class="schedule-sort-icon">
                            <svg v-if="sortField === 'index' && sortOrder === 'asc'" class="h-5 w-5" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z"
                                clip-rule="evenodd" />
                            </svg>
                            <svg v-else-if="sortField === 'index' && sortOrder === 'desc'" class="h-5 w-5"
                              viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z"
                                clip-rule="evenodd" />
                            </svg>
                            <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clip-rule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </th>
                    <th v-for="header in headerData" :key="header.key" scope="col"
                      :class="['schedule-header-cell', `w-${getColumnWidth(header.key)}`]">
                      <div class="schedule-header-content">
                        <div class="group inline-flex items-center cursor-pointer whitespace-nowrap"
                          @click="handleSort(header.key)">
                          {{ header.value }}
                          <span class="schedule-sort-icon">
                            <svg v-if="sortField === header.key && sortOrder === 'asc'" class="h-5 w-5"
                              viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z"
                                clip-rule="evenodd" />
                            </svg>
                            <svg v-else-if="sortField === header.key && sortOrder === 'desc'" class="h-5 w-5"
                              viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z"
                                clip-rule="evenodd" />
                            </svg>
                            <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clip-rule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="schedule-table-body">
                  <tr v-for="(item, index) in sortedScheduleData" :key="index" class="schedule-row">
                    <td class="schedule-cell text-gray-900">
                      <div class="flex items-center">
                        <span class="ml-2">{{ getSequenceNumber(index) }}</span>
                      </div>
                    </td>
                    <td class="schedule-cell text-gray-700">{{ item.machine_name }}</td>
                    <td class="table-cell">
                      <div class="table-cell-highlight">
                        {{ item.packing_date }}
                      </div>
                    </td>
                    <td class="schedule-cell text-gray-700">{{ item.customer_code }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.order_number }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.order_spec }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.product_number }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.product_name }}</td>
                    <td class="schedule-cell text-center">
                      <div class="schedule-cell-success mr-12">{{ item.plan_qty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="schedule-cell-info mr-12">{{ item.actual_qty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.changed_schedule_qty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.changed_manual_work_hours }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.erp_work_hours }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.stock }}</div>
                    </td>
                    <td class="schedule-cell">
                      <div class="schedule-cell-primary">{{ item.manufacturing_number }}</div>
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
