<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Disclosure } from '@headlessui/vue';
import { getProductLinesApi, getMachinesApi, syncErpDataApi, getOrdersApi } from '@/api';
import Toastify from 'toastify-js'
import { serverErrorToast } from '@/utils';

dayjs.locale('zh-tw')

// 基本狀態管理
const showAttempted = ref(true)
const showNoSearch = ref(false)
const showServerError = ref(false)
const showPendingTable = ref(false)
const selectedProductLine = ref('')
const selectedMachine = ref('')
const selectedPackingDate = ref('')
const selectScheduleDate = ref('')
const selectCustomerCode = ref('')
const selectOrderNumber = ref('')

// 排序相關狀態
const sortField = ref('')
const sortOrder = ref('asc')

// 產線資料
const productLineData = ref([])

// 在元件掛載時獲取產線資料
onMounted(async () => {
  await fetchProductLineData()
})

async function fetchProductLineData() {
  try {
    const res = await getProductLinesApi()
    productLineData.value = res.data.data
  } catch (error) {
    serverErrorToast()
  }
}

async function fetchMachineData() {
  if (selectedProductLine.value) {
    try {
      const res = await getMachinesApi(selectedProductLine.value)
      machineData.value = res.data.data
    } catch (error) {
      serverErrorToast()
    }
  }
}

// 監聽產線選擇的變化
watch(selectedProductLine, async (newValue) => {
  if (newValue) {
    await fetchMachineData()
  } else {
    machineData.value = []
  }
})

// 機台資料
const machineData = ref([])

// 計算屬性：根據選擇的產線過濾機台
const filteredMachineData = computed(() => {
  if (!selectedProductLine.value) {
    return []
  }
  return machineData.value.filter(machine => machine.product_line_code === selectedProductLine.value)
})

// 查詢按鈕觸發
async function handleSearchBtn() {
  showAttempted.value = false
  showPendingTable.value = false
  currentPage.value = 1  // 重置分頁到第一頁

  if (selectedProductLine.value) {
    if (!selectedPackingDate.value) {
      showAttempted.value = true

      Toastify({
        text: "請選擇包裝日",
        style: {
          background: "linear-gradient(to right, #ff3333, #ff6666)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
        },
        duration: 3000,
        close: true,
      }).showToast();

      showAttempted.value = true
    } else {
      showPendingTable.value = true
      showNoSearch.value = false
      const res = await fetchOrderData()
    }
  } else {
    Toastify({
      text: "請選擇生產線",
      style: {
        background: "linear-gradient(to right, #ff3333, #ff6666)",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
      },
      duration: 3000,
      close: true,
    }).showToast();

    showAttempted.value = true
  }
}

async function handleSyncErp() {
  try {
    const res = await syncErpDataApi()
    if (res.status === 200) {
      Toastify({
        text: "同步成功",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
        },
        duration: 3000,
        close: true,
      }).showToast();
    }
  } catch (error) {
    serverErrorToast()
  }
}

// 表頭資料
const headerData = [
  {
    'key': 'packing_date',
    'value': '包裝日'
  },
  {
    'key': 'customer_code',
    'value': '客戶代號'
  },
  {
    'key': 'order_number',
    'value': '訂單號碼'
  },
  {
    'key': 'order_spec',
    'value': '訂單序號'
  },
  {
    'key': 'product_number',
    'value': '品號'
  },
  {
    'key': 'product_name',
    'value': '品名-規格'
  },
  {
    'key': 'plan_qty',
    'value': '預計產量'
  },
  {
    'key': 'actual_qty',
    'value': '已生產數'
  },
  {
    'key': 'schedule_qty',
    'value': '排產數量'
  },
  {
    'key': 'manual_work_hours',
    'value': '手動工時'
  },
  {
    'key': 'erp_work_hours',
    'value': 'ERP工時'
  },
  {
    'key': 'stock',
    'value': '庫存'
  },
  {
    'key': 'manufacturing_number',
    'value': '製令單號'
  }
]

// 取得欄位寬度
const getColumnWidth = (key) => {
  const widthMap = {
    'packing_date': '20',
    'customer_code': '24',
    'order_number': '24',
    'order_spec': '20',
    'product_number': '32',
    'product_name': '32',
    'plan_qty': '24',
    'actual_qty': '24',
    'schedule_qty': '32',
    'manual_work_hours': '32',
    'erp_work_hours': '24',
    'stock': '24',
    'manufacturing_number': '32'
  }
  return widthMap[key] || '24'
}

// 全選
const selectAll = () => {
  if (selectedRows.value.size === orderData.value.data.length) {
    selectedRows.value.clear()
  } else {
    selectedRows.value = new Set(orderData.value.data.map((_, index) => index))
  }
}

// 日期範圍計算
const packingDateRange = computed(() => {
  return selectedPackingDate.value?.map(date => dayjs(date).format('YYYYMMDD')) ?? ['', '']
})

const packingBeginDate = computed(() => packingDateRange.value[0])
const packingEndDate = computed(() => packingDateRange.value[1])

// 工單資料
const orderData = ref([])

async function fetchOrderData() {
  try {
    const [packingBeginDate, packingEndDate] = packingDateRange.value
    
    if (packingEndDate == 'Invalid Date') {
      showPendingTable.value = false
      showAttempted.value = true

      Toastify({
        text: "請選擇包裝日",
        style: {
          background: "linear-gradient(to right, #ff3333, #ff6666)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
        },
        duration: 3000,
        close: true,
      }).showToast();

      return
    }

    const res = await getOrdersApi(selectedProductLine.value, packingBeginDate, packingEndDate, selectCustomerCode.value, selectOrderNumber.value)

    if (res.status === 200) {
      orderData.value = res.data
      showNoSearch.value = false

      if (orderData.value.data.length === 0) {
        showNoSearch.value = true
        showPendingTable.value = false
      }
    }
  } catch (error) {
    showServerError.value = true
    showPendingTable.value = false
    orderData.value = { data: [], count: 0 }
  }
}

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
    item.schedule_qty = Number(item.schedule_qty) + 1
  } else if (type === 'decrease' && item.schedule_qty > 0) {
    item.schedule_qty = Number(item.schedule_qty) - 1
  }
}

// 處理手動工時的變化
const handleManualWorkHoursChange = (item, type) => {
  if (type === 'increase') {
    item.manual_work_hours = Number(item.manual_work_hours) + 1
  } else if (type === 'decrease' && item.manual_work_hours > 0) {
    item.manual_work_hours = Number(item.manual_work_hours) - 1
  }
}

// 添加分頁相關的響應式數據
const currentPage = ref(1)
const limit = ref(25)

// 計算分頁資訊
const paginationInfo = computed(() => {
  const total = orderData.value?.count || 0
  const start = (currentPage.value - 1) * limit.value + 1
  const end = Math.min(currentPage.value * limit.value, total)

  return {
    start,
    end,
    total
  }
})

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil((orderData.value?.count || 0) / limit.value)
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
async function handlePageClick(page) {
  if (typeof page === 'number') {
    currentPage.value = page

    const res = await getOrdersApi(selectedProductLine.value, packingBeginDate.value, packingEndDate.value, selectCustomerCode.value, selectOrderNumber.value, page - 1)
    orderData.value = {
      ...orderData.value,
      data: res.data.data
    }
  }
}

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
const sortedOrderData = computed(() => {
  if (!sortField.value || !orderData.value.data) return orderData.value.data

  return [...orderData.value.data].sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // 處理數字型別的欄位
    const numericFields = ['plan_qty', 'actual_qty', 'schedule_qty', 'stock']
    if (numericFields.includes(sortField.value)) {
      aValue = Number(aValue) || 0
      bValue = Number(bValue) || 0
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

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
                  <input type="text" class="input-field" placeholder="請輸入客戶" v-model="selectCustomerCode">
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
                  <input type="text" class="input-field" placeholder="請輸入訂單編號" v-model="selectOrderNumber">
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
                    class="date-picker-custom" locale="zh-TW" placeholder="請選擇日期範圍" v-model="selectedPackingDate" />
                </div>
              </div>
              <div class="flex justify-center">
                <button type="button" class="search-button" @click="handleSearchBtn">
                  搜尋
                </button>
              </div>
              <div class="flex justify-center">
                <button class="search-reset-button">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" @click="handleSyncErp">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="attempted-load-container" v-if="showAttempted">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 19l0 -13.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
              </path>
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M12 5l5 5M12 5l-5 5">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0" />
              </path>
            </g>
          </svg>
          <span>點擊查詢資料</span>
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

        <div class="attempted-load-container" v-if="showServerError">
          <svg xmlns="http://www.w3.org/2000/svg" width="72" height="60" viewBox="0 0 24 24">
            <g fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2">
              <path stroke-dasharray="64" stroke-dashoffset="64" d="M12 3l9 17h-18l9 -17Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
              </path>
              <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10v4">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0" />
                <animate attributeName="stroke-width" begin="1.95s" dur="3s" keyTimes="0;0.1;0.2;0.3;1"
                  repeatCount="indefinite" values="2;3;3;2;2" />
              </path>
              <path stroke-dasharray="2" stroke-dashoffset="2" d="M12 17v0.01">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0" />
                <animate attributeName="stroke-width" begin="2.25s" dur="3s" keyTimes="0;0.1;0.2;0.3;1"
                  repeatCount="indefinite" values="2;3;3;2;2" />
              </path>
              <animate fill="freeze" attributeName="fill-opacity" begin="1.1s" dur="0.15s" values="0;0.3" />
            </g>
          </svg>
          <span>連線錯誤</span>
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
                    header.key === 'product_name' ? 'min-w-[300px]' : `w-${getColumnWidth(header.key)}`
                  ]">
                    <div class="group table-header-content cursor-pointer" @click="handleSort(header.key)">
                      {{ header.value }}
                      <span class="table-sort-icon">
                        <svg v-if="sortField === header.key && sortOrder === 'asc'" class="h-5 w-5" viewBox="0 0 20 20"
                          fill="currentColor">
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
                  </th>
                </tr>
              </thead>

              <tbody class="table-body">
                <tr v-for="(item, index) in sortedOrderData" :key="item.id" class="table-row"
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
                      {{ item.packing_date }}
                    </div>
                  </td>
                  <td class="table-cell text-sm text-gray-700">{{ item.customer_code }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.order_number }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.order_spec }}</td>
                  <td class="table-cell text-sm text-gray-700">{{ item.product_number }}</td>
                  <td class="table-cell text-sm text-gray-700 whitespace-pre-line">{{ item.product_name }}</td>
                  <td class="table-cell text-center">
                    <div class="table-cell-success">{{ item.plan_qty }}</div>
                  </td>
                  <td class="table-cell text-center">
                    <div class="table-cell-success">{{ item.actual_qty }}</div>
                  </td>
                  <td class="table-cell">
                    <div class="table-quantity-control">
                      <button class="table-quantity-button-increase"
                        @click="handleScheduledQtyChange(item, 'increase')">
                        +
                      </button>
                      <input type="number" v-model="item.schedule_qty" min="0"
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
                      <input type="number" v-model="item.manual_work_hours" min="0"
                        @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
                        class="table-quantity-input">
                      <button class="table-quantity-button-decrease"
                        @click="handleManualWorkHoursChange(item, 'decrease')">
                        -
                      </button>
                    </div>
                  </td>
                  <td class="table-cell text-center text-gray-700">{{ 0 }}</td>
                  <td class="table-cell text-center text-gray-700">{{ item.stock }}</td>
                  <td class="table-cell">
                    <div class="table-cell-primary">{{ item.manufacturing_number }}</div>
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

                    <template v-for="(page, index) in displayedPages" :key="index">
                      <template v-if="page === '...'">
                        <span class="pagination-ellipsis">...</span>
                      </template>
                      <template v-else>
                        <button class="pagination-nav-button"
                          :class="{ 'bg-indigo-600 text-white': page === currentPage }" @click="handlePageClick(page)">
                          {{ page }}
                        </button>
                      </template>
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
                  <option v-for="item in filteredMachineData" :key="item.product_line_code"
                    :value="item.product_line_code">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <p class="search-field-label">排程日期</p>
                <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                  locale="zh-TW" placeholder="請選擇日期" v-model="selectScheduleDate" />
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
                  <tr v-for="item in filteredMachineData" :key="item.product_line_code" class="hover:bg-gray-50">
                    <td class="work-time-machine-cell">{{ item.name }}</td>
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
