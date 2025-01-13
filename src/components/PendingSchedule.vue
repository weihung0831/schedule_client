<script setup>
import { onMounted, ref, computed } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Disclosure } from '@headlessui/vue';

dayjs.locale('zh-tw')

// 基本狀態管理
const showAttempted = ref(true)
const showPendingTable = ref(false)
const selectedProductLine = ref('')
const selectedMachine = ref('')
const selectedPackingDate = ref('')
const selectScheduleDate = ref('')

// 產線資料
const productLineData = [
  { 'code': 2300, 'name': '產線1' },
  { 'code': 2301, 'name': '產線2' },
  { 'code': 2302, 'name': '產線3' },
  { 'code': 2303, 'name': '產線4' },
  { 'code': 2304, 'name': '產線5' },
]

// 機台資料
const machineData = [
  {
    'productLineCode': 2300, 'machineName': '機台1'
  },
  {
    'productLineCode': 2301, 'machineName': '機台2'
  },
  {
    'productLineCode': 2302, 'machineName': '機台3'
  },
  {
    'productLineCode': 2303, 'machineName': '機台4'
  },
  {
    'productLineCode': 2304, 'machineName': '機台5'
  }
]

// 計算屬性：根據選擇的產線過濾機台
const filteredMachineData = computed(() => {
  if (!selectedProductLine.value) {
    return []
  }
  return machineData.filter(machine => machine.productLineCode === selectedProductLine.value)
})

// 查詢按鈕觸發
const searchBtnClick = () => {
  showAttempted.value = false
  showPendingTable.value = true
}

// 全選
const selectAll = () => {
  if (selectedRows.value.size === orderData.value.length) {
    selectedRows.value.clear()
  } else {
    selectedRows.value = new Set(orderData.value.map((_, index) => index))
  }
}

// 表頭資料
const headerData = [
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
    'packingDate': '20',
    'customerCode': '24',
    'orderNumber': '24',
    'orderSeq': '20',
    'productNumber': '32',
    'productName': '32',
    'plannedQty': '24',
    'actualQty': '24',
    'scheduledQty': '32',
    'manualWorkHours': '32',
    'erpWorkHours': '24',
    'stock': '24',
    'manufacturingOrder': '32'
  }
  return widthMap[key] || '24'
}

// 工單資料
const orderData = ref([
  {
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

const selectedRows = ref(new Set())

// 行選擇
const handleRowSelect = (index) => {
  if (selectedRows.value.has(index)) {
    selectedRows.value.delete(index)
  } else {
    selectedRows.value.add(index)
  }
}

// 處理排產數量的變化
const handleScheduledQtyChange = (item, type) => {
  if (type === 'increase') {
    item.scheduledQty = Number(item.scheduledQty) + 1
  } else if (type === 'decrease' && item.scheduledQty > 0) {
    item.scheduledQty = Number(item.scheduledQty) - 1
  }
}

// 處理手動工時的變化
const handleManualWorkHoursChange = (item, type) => {
  if (type === 'increase') {
    item.manualWorkHours = Number(item.manualWorkHours) + 1
  } else if (type === 'decrease' && item.manualWorkHours > 0) {
    item.manualWorkHours = Number(item.manualWorkHours) - 1
  }
}

// 添加分頁相關的響應式數據
const currentPage = ref(1)
const pageSize = ref(1) // 每頁顯示數量

// 計算分頁資訊
const paginationInfo = computed(() => {
  const total = orderData.value.length
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
  return Math.ceil(orderData.value.length / pageSize.value)
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

const startDate = computed(() => currentWeekStart.value.format('YYYY/MM/DD'))
const endDate = computed(() => currentWeekStart.value.add(6, 'day').format('YYYY/MM/DD'))

// 切換到上一週
const previousWeek = () => {
  currentWeekStart.value = currentWeekStart.value.subtract(1, 'week')
}

// 切換到下一週
const nextWeek = () => {
  currentWeekStart.value = currentWeekStart.value.add(1, 'week')
}

// 日期相關設定
const currentWeekStart = ref(dayjs().startOf('week').add(1, 'day')) // 將週一設為起始日

// 日期計算
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
</script>

<template>
  <div class="app-container">
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

    <div class="main-content">
      <div class="content-wrapper">
        <div class="search-container">
          <div class="search-header">
            <div class="flex items-center gap-6">
              <div class="search-field-group">
                <p class="search-field-label">產線</p>
                <select class="select-base" v-model="selectedProductLine">
                  <option value="">請選擇生產線</option>
                  <option v-for="item in productLineData" :key="item.code" :value="item.code">{{ item.name }}</option>
                </select>
              </div>
              <div class="search-field-group">
                <p class="search-field-label">客戶</p>
                <div class="input-container">
                  <input type="text" class="input-field" placeholder="請輸入客戶">
                  <div class="input-icon">
                    <svg class="input-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="search-field-group">
                <p class="search-field-label">訂單編號</p>
                <div class="input-container">
                  <input type="text" class="input-field" placeholder="請輸入訂單編號">
                  <div class="input-icon">
                    <svg class="input-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="search-field-group">
                <p class="search-field-label">包裝日期</p>
                <div class="date-container">
                  <VueDatePicker range format="yyyy-MM-dd" :teleport="true" :auto-position="true"
                    class="date-picker-custom" locale="zh-TW" placeholder="請選擇日期範圍" v-model="selectedPackingDate"/>
                </div>
              </div>
              <div class="flex justify-center">
                <button type="button" class="search-button" @click="searchBtnClick">
                  搜尋
                </button>
              </div>
              <div class="flex justify-center">
                <button class="search-reset-button">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="attempted-load-container" v-if="showAttempted">
          <svg class="attempted-load-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>點擊查詢資料</span>
        </div>

        <div v-if="showPendingTable">
          <div class="table-container">
            <table class="table-base">
              <thead>
                <tr class="table-header">
                  <th scope="col" class="table-header-cell w-12">
                    <div class="flex items-center">
                      <input type="checkbox" class="table-checkbox" @click="selectAll">
                      <div class="group table-header-content">
                        #
                        <span class="table-sort-icon">
                          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                              clip-rule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </th>
                  <th v-for="header in headerData" :key="header.key" scope="col" :class="[
                    'table-header-cell',
                    header.key === 'productName' ? 'min-w-[300px]' : `w-${getColumnWidth(header.key)}`
                  ]">
                    <div class="group table-header-content">
                      {{ header.value }}
                      <span class="table-sort-icon">
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="(item, index) in orderData" :key="index" class="table-row"
                  :class="{ 'table-row-selected': selectedRows.has(index) }">
                  <td class="table-cell">
                    <div class="flex items-center">
                      <input type="checkbox" class="table-checkbox" :checked="selectedRows.has(index)"
                        @change="handleRowSelect(index)">
                      <span class="ml-2">{{ index + 1 }}</span>
                    </div>
                  </td>
                  <td class="table-cell">
                    <div class="table-cell-highlight">
                      {{ item.packingDate }}
                    </div>
                  </td>
                  <td class="table-cell text-sm text-gray-700">{{ item.customerCode }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.orderNumber }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.orderSeq }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.productNumber }}</td>
                  <td class="table-cell text-sm text-gray-700 whitespace-pre-line">{{ item.productName }}</td>
                  <td class="table-cell text-center">
                    <div class="table-cell-success">{{ item.plannedQty }}</div>
                  </td>
                  <td class="table-cell text-center">
                    <div class="table-cell-success">{{ item.actualQty }}</div>
                  </td>
                  <td class="table-cell">
                    <div class="table-quantity-control">
                      <button class="table-quantity-button-increase"
                        @click="handleScheduledQtyChange(item, 'increase')">
                        +
                      </button>
                      <input type="number" v-model="item.scheduledQty" min="0"
                        @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
                        class="table-quantity-input">
                      <button class="table-quantity-button-decrease"
                        @click="handleScheduledQtyChange(item, 'decrease')">
                        -
                      </button>
                    </div>
                  </td>
                  <td class="table-cell">
                    <div class="table-quantity-control">
                      <button class="table-quantity-button-increase"
                        @click="handleManualWorkHoursChange(item, 'increase')">
                        +
                      </button>
                      <input type="number" v-model="item.manualWorkHours" min="0"
                        @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
                        class="table-quantity-input">
                      <button class="table-quantity-button-decrease"
                        @click="handleManualWorkHoursChange(item, 'decrease')">
                        -
                      </button>
                    </div>
                  </td>
                  <td class="table-cell text-center text-gray-700">{{ item.erpWorkHours }}</td>
                  <td class="table-cell text-center text-gray-700">{{ item.stock }}</td>
                  <td class="table-cell">
                    <div class="table-cell-primary">{{ item.manufacturingOrder }}</div>
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

          <div class="flex justify-end items-center mt-4 gap-4">
            <div class="flex items-center gap-4">
              <div class="search-field-group">
                <p class="search-field-label">機台</p>
                <select class="select-base" v-model="selectedMachine">
                  <option value="">請選擇機台</option>
                  <option v-for="item in filteredMachineData" :key="item.productLineCode" :value="item.productLineCode">
                    {{ item.machineName }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <p class="search-field-label">排程日期</p>
                <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                  locale="zh-TW" placeholder="請選擇日期" v-model="selectScheduleDate"/>
              </div>
              <div>
                <button type="button" class="save-button">
                  存檔
                </button>
              </div>
            </div>
          </div>
        </div>

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
                    <th v-for="date in displayDates" :key="date.value" scope="col" class="work-time-date-cell">
                      {{ date.label }} {{ date.weekday }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="item in filteredMachineData" :key="item.productLineCode" class="hover:bg-gray-50">
                    <td class="work-time-machine-cell">{{ item.machineName }}</td>
                    <td v-for="date in displayDates" :key="date.value" class="px-3 py-4 text-center">
                      <div class="work-time-hours">0 小時</div>
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
