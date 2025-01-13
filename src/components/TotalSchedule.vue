<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { Disclosure } from '@headlessui/vue';
import JsonExcel from 'vue-json-excel3'

dayjs.locale('zh-tw')

const singleDate = ref(dayjs().format('YYYY-MM-DD'))

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

// 處理日期選擇
const selectDate = (date) => {
  singleDate.value = date.value
  showTable.value = true
  showChart.value = true
  showAttempted.value = false
}

// 切換到前一天
const previousWeek = () => {
  singleDate.value = dayjs(singleDate.value).subtract(1, 'day').format('YYYY-MM-DD')
  scrollToSelected()
}

// 切換到後一天
const nextWeek = () => {
  singleDate.value = dayjs(singleDate.value).add(1, 'day').format('YYYY-MM-DD')
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
  scrollToSelected()
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

const exportFields = {
  '機台': 'machine',
  '包裝日': 'packingDate',
  '客戶代號': 'customerCode',
  '訂單號碼': 'orderNumber',
  '訂單序號': 'orderSeq',
  '品號': 'productNumber',
  '品名-規格': 'productName',
  '預計產量': 'plannedQty',
  '已生產數': 'actualQty',
  '排產數量': 'scheduledQty',
  '手動工時': 'manualWorkHours',
  'ERP工時': 'erpWorkHours',
  '庫存': 'stock',
  '製令單號': 'manufacturingOrder'
}

const exportData = computed(() => scheduleData.value)

// 表頭資料
const headerData = [
  {
    'key': 'machine',
    'value': '機台'
  },
  {
    'key': 'packingDate',
    'value': '包裝日'
  },
  {
    'key': 'customerCode',
    'value': '客戶代號'
  },
  {
    'key': 'orderNumber',
    'value': '訂單號碼'
  },
  {
    'key': 'orderSeq',
    'value': '訂單序號'
  },
  {
    'key': 'productNumber',
    'value': '品號'
  },
  {
    'key': 'productName',
    'value': '品名-規格'
  },
  {
    'key': 'plannedQty',
    'value': '預計產量'
  },
  {
    'key': 'actualQty',
    'value': '已生產數'
  },
  {
    'key': 'scheduledQty',
    'value': '排產數量'
  },
  {
    'key': 'manualWorkHours',
    'value': '手動工時'
  },
  {
    'key': 'erpWorkHours',
    'value': 'ERP工時'
  },
  {
    'key': 'stock',
    'value': '庫存'
  },
  {
    'key': 'manufacturingOrder',
    'value': '製令單號'
  }
]

// 取得欄位寬度
const getColumnWidth = (key) => {
  const widthMap = {
    'machine': '24',
    'packingDate': '24',
    'customerCode': '24',
    'orderNumber': '24',
    'orderSeq': '24',
    'productNumber': '24',
    'productName': '24',
    'plannedQty': '24',
    'actualQty': '24',
    'scheduledQty': '24',
    'manualWorkHours': '24',
    'erpWorkHours': '24',
    'stock': '24',
    'manufacturingOrder': '24'
  }
  return widthMap[key] || '24'
}

// 排程資料
const scheduleData = ref([
  {
    machine: 'M021',
    packingDate: '12/10',
    customerCode: 'D01-MIT',
    orderNumber: '202406067',
    orderSeq: '0050',
    productNumber: 'B3T25TK3T-N-PT50',
    productName: 'CR-V 插入式BIT套筒 1/4"T25*37L(南孔)\n灰盒S01/50,TEKTON SHB04225.R01',
    plannedQty: 300,
    actualQty: 0,
    scheduledQty: 300,
    manualWorkHours: 1230,
    erpWorkHours: 1230,
    stock: 100,
    manufacturingOrder: 'M021-202407019H'
  },
  {
    machine: 'M021',
    packingDate: '12/13',
    customerCode: 'E42-3518',
    orderNumber: '202408002',
    orderSeq: '0020',
    productNumber: 'B8T30BW3Q-N-B10',
    productName: 'CR-V 插入式BIT套筒 1/2"5/16"T30*100L(南孔)\n彩盒S02/10/100,Beta WORKER BW 920TX-L 30(00009206534)80548093155222',
    plannedQty: 800,
    actualQty: 0,
    scheduledQty: 800,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    manufacturingOrder: 'M021-202408034I'
  }
])

// 添加分頁相關的響應式數據
const currentPage = ref(1)
const pageSize = ref(1) // 每頁顯示數量

// 計算分頁資訊
const paginationInfo = computed(() => {
  const total = scheduleData.value.length
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, total)

  return {
    start,
    end,
    total
  }
})

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(scheduleData.value.length / pageSize.value)
})

// 計算要顯示的頁碼
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    // 如果總頁數小於等於 7，顯示所有頁碼
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 總是顯示第一頁
    pages.push(1)

    if (current <= 3) {
      // 當前頁在前面時
      pages.push(2, 3, 4, '...', total)
    } else if (current >= total - 2) {
      // 當前頁在後面時
      pages.push('...', total - 3, total - 2, total - 1, total)
    } else {
      // 當前頁在中間時
      pages.push('...', current - 1, current, current + 1, '...', total)
    }
  }
  return pages
})

// 處理頁碼點擊
const handlePageClick = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="page-container">
    <Disclosure as="nav" class="nav-container">
      <div class="nav-inner">
        <div class="nav-header">
          <div class="nav-brand">
            <div class="nav-logo">
              <a href="/Default">
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
        <!-- <DateHeader /> -->
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
            <download-excel :data="exportData" :fields="exportFields" type="xlsx" worksheet="Schedule"
              :name="`排程資料_${currentDate}.xlsx`" class="excel-export-button">
              <svg class="excel-export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
              匯出 Excel
            </download-excel>
          </div>

          <div class="table-section">
            <div class="schedule-table-container">
              <table class="schedule-table">
                <thead>
                  <tr class="schedule-table-header">
                    <th scope="col" class="schedule-header-cell w-12">
                      <div class="schedule-header-content">
                        <div class="group inline-flex cursor-pointer ml-2">
                          次序
                          <span class="schedule-sort-icon">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
                          :class="{ 'justify-center': header.key !== 'productNumber' && header.key !== 'productName' }">
                          {{ header.value }}
                          <span class="schedule-sort-icon">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
                  <tr v-for="(item, index) in scheduleData" :key="index" class="schedule-row">
                    <td class="schedule-cell text-gray-900">
                      <div class="flex items-center">
                        <span class="ml-2">{{ index + 1 }}</span>
                      </div>
                    </td>
                    <td class="schedule-cell text-gray-700">{{ item.machine }}</td>
                    <td class="table-cell">
                      <div class="table-cell-highlight">
                        {{ item.packingDate }}
                      </div>
                    </td>
                    <td class="schedule-cell text-gray-700">{{ item.customerCode }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.orderNumber }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.orderSeq }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.productNumber }}</td>
                    <td class="schedule-cell text-gray-700">{{ item.productName }}</td>
                    <td class="schedule-cell text-center">
                      <div class="schedule-cell-success mr-12">{{ item.plannedQty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="schedule-cell-info mr-12">{{ item.actualQty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.scheduledQty }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.manualWorkHours }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.erpWorkHours }}</div>
                    </td>
                    <td class="schedule-cell text-center">
                      <div class="text-gray-900 font-medium mr-12">{{ item.stock }}</div>
                    </td>
                    <td class="schedule-cell">
                      <div class="schedule-cell-primary">{{ item.manufacturingOrder }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="pagination-container">
                <div class="pagination-desktop">
                  <div>
                    <p class="pagination-info">
                      顯示第
                      <span class="pagination-info-number">{{ paginationInfo.start }}</span> 到
                      <span class="pagination-info-number">{{ paginationInfo.end }}</span> 筆，共
                      <span class="pagination-info-number">{{ paginationInfo.total }}</span> 筆資料
                    </p>
                  </div>
                  <div class="pagination-nav-wrapper">
                    <nav class="pagination-nav" aria-label="Pagination">
                      <button class="pagination-nav-arrow pagination-nav-arrow-left" :disabled="currentPage === 1"
                        @click="currentPage > 1 && (currentPage--)">
                        <span class="sr-only">上一頁</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>

                      <template v-for="page in displayedPages" :key="page">
                        <span v-if="page === '...'" class="pagination-ellipsis">...</span>
                        <button v-else class="pagination-nav-button"
                          :class="{ 'bg-indigo-600 text-white': page === currentPage }" @click="handlePageClick(page)">
                          {{ page }}
                        </button>
                      </template>

                      <button class="pagination-nav-arrow pagination-nav-arrow-right"
                        :disabled="currentPage === totalPages" @click="currentPage < totalPages && (currentPage++)">
                        <span class="sr-only">下一頁</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                  <div class="pagination-right-space"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
