<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Disclosure } from '@headlessui/vue';
import { getProductLinesApi, getMachinesApi, syncErpDataApi, getOrdersApi, createSchedulesApi, getMachineWorkHoursApi, getSchedulesApi, updateSchedulesApi } from '@/api';
import { errorToast, orderTableHeader, successToast, machineScheduleTableHeader } from '@/utils';

dayjs.locale('zh-tw')

// 基本狀態管理
const showAttempted = ref(true)
const showNoSearch = ref(false)
const showPendingTable = ref(false)
const showScheduleModal = ref(false)
const selectedProductLine = ref('')
const selectedMachine = ref('')
const selectMachine = ref('')
const selectedPackingDate = ref('')
const selectedPlanBeginDate = ref('')
const selectedPlanEndDate = ref('')
const selectCustomerCode = ref('')
const selectOrderNumber = ref('')

// Modal 相關狀態
const modalScheduleData = ref([])
const modalMachineName = ref('')
const modalDate = ref('')
const isSaving = ref(false)
const selectedModalRows = ref(new Set())
const modalScheduleDate = ref('')

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
    errorToast('取得產線資料失敗')
  }
}

async function fetchMachineData() {
  if (selectedProductLine.value) {
    try {
      const res = await getMachinesApi(selectedProductLine.value)
      machineData.value = res.data.data
    } catch (error) {
      errorToast('取得機台資料失敗')
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

// 新增 loading 狀態
const isLoading = ref(false)

// 查詢按鈕觸發
async function handleSearchBtn() {
  showAttempted.value = false
  showPendingTable.value = false
  isLoading.value = true
  selectedRows.value.clear()

  try {
    if (selectedProductLine.value) {
      if (!selectedPackingDate.value) {
        showAttempted.value = true
        errorToast('請選擇包裝日')
      } else {
        await fetchOrderData()
      }
    } else {
      showAttempted.value = true
      errorToast('請選擇生產線')
    }
  } catch (error) {
    errorToast(error)
  } finally {
    isLoading.value = false
  }
}

async function handleSyncErp() {
  showAttempted.value = false
  isLoading.value = true
  showPendingTable.value = false

  try {
    const res = await syncErpDataApi()
    console.log(res)
    if (res.status === 200) {
      successToast('同步成功')
    }
  } catch (error) {
    errorToast('同步失敗')
  } finally {
    isLoading.value = false
    showAttempted.value = true
  }
}

// 表頭資料
const headerData = orderTableHeader

// 取得欄位寬度
const getColumnWidth = (key) => {
  const widthMap = {
    'packing_date': '20',
    'plan_begin_date': '20',
    'plan_end_date': '20',
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
    'manufacturing_number': '32',
    'machine': '32'  // 添加機台欄位的寬度
  }
  return widthMap[key] || '24'
}

// 全選
const selectAll = () => {
  if (selectedRows.value.size === orderData.value.data.length) {
    selectedRows.value.clear()  // 如果全部都被選中，則清空選擇
  } else {
    selectedRows.value = new Set(orderData.value.data.map((_, index) => index))  // 否則選擇全部
    // 如果已經選擇了機台，將其應用到所有新選擇的行
    if (selectMachine.value) {
      orderData.value.data.forEach(item => {
        item.selectedMachine = selectMachine.value
      })
    }
  }
}

// 日期範圍計算
const packingDateRange = computed(() => {
  return selectedPackingDate.value?.map(date => dayjs(date).format('YYYYMMDD')) ?? ['', '']
})

// 工單資料
const orderData = ref([])

async function fetchOrderData() {
  try {
    let [packingBeginDate, packingEndDate] = packingDateRange.value
    const formattedPlanBeginDate = selectedPlanBeginDate.value ? dayjs(selectedPlanBeginDate.value).format('YYYYMMDD') : ''
    const formattedPlanEndDate = selectedPlanEndDate.value ? dayjs(selectedPlanEndDate.value).format('YYYYMMDD') : ''

    if (packingEndDate == 'Invalid Date') {
      packingEndDate = ''
    }

    const res = await getOrdersApi(
      selectedProductLine.value,
      packingBeginDate,
      packingEndDate,
      selectCustomerCode.value,
      selectOrderNumber.value,
      formattedPlanBeginDate,
      formattedPlanEndDate
    )

    console.log(res)

    if (res.status === 200) {
      // 為每個訂單添加機台選擇字段和排程日期字段
      orderData.value = {
        ...res.data,
        data: res.data.data.map(item => ({
          ...item,
          selectedMachine: '',
          selectedScheduleDate: null  // Add individual schedule date for each row
        }))
      }
      showNoSearch.value = false
      showPendingTable.value = true

      if (orderData.value.data.length === 0) {
        showNoSearch.value = true
        showPendingTable.value = false
      }
    }
  } catch (error) {
    console.log(error)
    errorToast('取得資料失敗')
    showPendingTable.value = false
    orderData.value = { data: [], count: 0 }
  }
}

const selectedRows = ref(new Set())
const selectedOrderId = ref([])

// 行選擇
const handleRowSelect = (index) => {
  selectedOrderId.value = orderData.value.data[index]

  if (selectedRows.value.has(index)) {
    selectedRows.value.delete(index)
  } else {
    selectedRows.value.add(index)
    // 如果已經選擇了機台，則將其應用到新選擇的行
    if (selectMachine.value) {
      orderData.value.data[index].selectedMachine = selectMachine.value
    }
  }
}

async function handleSaveBtn() {
  if (selectedRows.value.size === 0) {
    errorToast('請選擇排程項目')
    return
  }

  const selectedItems = Array.from(selectedRows.value)
  const hasUnselectedMachine = selectedItems.some(index => !orderData.value.data[index].selectedMachine)
  const hasUnselectedDate = selectedItems.some(index => !orderData.value.data[index].selectedScheduleDate)

  if (hasUnselectedMachine) {
    errorToast('請為選中的項目選擇機台')
    return
  }

  if (hasUnselectedDate) {
    errorToast('請為選中的項目選擇排程日期')
    return
  }

  const schedules = Array.from(selectedRows.value).map(index => {
    const item = orderData.value.data[index]
    return {
      order_id: Number(item.id),
      machine_name: item.selectedMachine,
      schedule_date: dayjs(item.selectedScheduleDate).format('YYYYMMDD'),
      changed_schedule_qty: Number(item.schedule_qty),
      changed_manual_work_hours: Number(item.manual_work_hours)
    }
  })

  try {
    const res = await createSchedulesApi({ schedules })
    if (res.status === 200) {
      successToast('存檔成功')
      // 清除所有選擇
      selectedRows.value = new Set()
      selectedOrderId.value = []
      // 清除已保存項目的機台選擇和日期
      schedules.forEach(schedule => {
        const item = orderData.value.data.find(item => item.id === schedule.order_id)
        if (item) {
          item.selectedMachine = ''
          item.selectedScheduleDate = null
        }
      })
      // 清除機台選擇
      selectMachine.value = ''
      // 重新獲取數據以刷新表格
      await fetchOrderData()
      await fetchMachineWorkHours()
    }
  } catch (error) {
    console.error(error)
    errorToast('存檔失敗')
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
    // 處理次序欄位的特殊情況
    if (sortField.value === 'index') {
      const aIndex = orderData.value.data.indexOf(a) + 1
      const bIndex = orderData.value.data.indexOf(b) + 1
      return sortOrder.value === 'asc' ? aIndex - bIndex : bIndex - aIndex
    }

    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // 處理數字型別的欄位
    const numericFields = ['plan_qty', 'actual_qty', 'schedule_qty', 'manual_work_hours', 'erp_work_hours', 'stock']
    if (numericFields.includes(sortField.value)) {
      aValue = Number(aValue) || 0
      bValue = Number(bValue) || 0
    }

    // 處理機台欄位的特殊情況
    if (sortField.value === 'selectedMachine') {
      aValue = aValue || ''
      bValue = bValue || ''
    }

    // 比較值
    if (aValue === bValue) return 0
    const comparison = aValue > bValue ? 1 : -1
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// 計算序號
const getSequenceNumber = (index) => {
  if (sortField.value === 'index') {
    return sortOrder.value === 'asc' ? index + 1 : orderData.value.data.length - index
  }
  return index + 1
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
      value: date.format('YYYYMMDD'),
      label: date.format('MM/DD'),
      weekday: date.format('ddd')
    })
  }
  return dates
})

// 批次設定機台
watch([selectMachine, selectedRows], ([newMachine, newSelectedRows]) => {
  if (newMachine) {
    // 更新所有已選中的行
    Array.from(newSelectedRows).forEach(index => {
      if (orderData.value.data[index]) {
        orderData.value.data[index].selectedMachine = newMachine
      }
    })
  }
}, { deep: true })

// 計算全選狀態
const isAllSelected = computed(() => {
  return orderData.value.data && orderData.value.data.length > 0 && selectedRows.value.size === orderData.value.data.length
})

const machineWorkHours = ref({})

// 獲取機台工時資料
async function fetchMachineWorkHours() {
  try {
    const beginDate = currentWeekStart.value.format('YYYYMMDD')
    const endDate = currentWeekStart.value.add(6, 'day').format('YYYYMMDD')

    // 為每個機台獲取工時資料
    for (const machine of filteredMachineData.value) {
      const res = await getMachineWorkHoursApi(beginDate, endDate, machine.name)
      if (res.status === 200) {
        // 初始化該機台的資料結構
        machineWorkHours.value[machine.name] = {}

        // 處理 API 回傳的資料
        res.data.data.forEach(item => {
          const formattedDate = dayjs(item.date).format('YYYYMMDD')
          machineWorkHours.value[machine.name][formattedDate] = {
            work_hours: item.changed_manual_work_hours
          }
        })
      }
    }
  } catch (error) {
    console.error(error)
    errorToast('取得機台工時資料失敗')
  }
}

// 監聽週次變更
watch([currentWeekStart, filteredMachineData], async () => {
  if (filteredMachineData.value.length > 0) {
    await fetchMachineWorkHours()
  }
}, { immediate: true })

async function handleWorkTimeChange(machineName, date) {
  modalMachineName.value = machineName
  modalDate.value = dayjs(date).format('YYYY/MM/DD')

  try {
    const res = await getSchedulesApi(date, machineName)
    if (res.status === 200) {
      modalScheduleData.value = res.data.data.map(item => ({
        ...item,
        selectedMachine: machineName,
        selectedDate: dayjs(date).format('YYYY-MM-DD') // 設定初始日期
      }))
      showScheduleModal.value = true
    }
  } catch (error) {
    console.error(error)
    errorToast('取得排程資料失敗')
  }
}

// 處理全選
const isAllModalSelected = computed(() => {
  return modalScheduleData.value.length > 0 && selectedModalRows.value.size === modalScheduleData.value.length
})

function handleModalSelectAll() {
  if (isAllModalSelected.value) {
    selectedModalRows.value.clear()
  } else {
    selectedModalRows.value = new Set(modalScheduleData.value.map((_, index) => index))
  }
}

function handleModalRowSelect(index) {
  if (selectedModalRows.value.has(index)) {
    selectedModalRows.value.delete(index)
  } else {
    selectedModalRows.value.add(index)
  }
}

// 處理排程修改
async function handleScheduleChange() {
  if (selectedModalRows.value.size === 0) {
    errorToast('請選擇要修改的項目')
    return
  }

  isSaving.value = true
  try {
    const schedules = Array.from(selectedModalRows.value).map(index => {
      const schedule = modalScheduleData.value[index]
      return {
        id: schedule.id,
        machine_name: schedule.selectedMachine,
        schedule_date: dayjs(schedule.selectedDate).format('YYYYMMDD')
      }
    })

    const res = await updateSchedulesApi({ schedules })
    if (res.status === 200) {
      successToast('修改成功')
      closeModal()
      // 重新獲取工時資料
      await fetchMachineWorkHours()
    }
  } catch (error) {
    console.error(error)
    errorToast('修改失敗')
  } finally {
    isSaving.value = false
  }
}

// 關閉 modal 時清空選擇
function closeModal() {
  showScheduleModal.value = false
  selectedModalRows.value.clear()
}

const modalHeaderData = machineScheduleTableHeader
</script>

<template>
  <div class="app-container">
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
                <p class="search-field-label">包裝日</p>
                <div class="date-container-range">
                  <VueDatePicker range format="yyyy-MM-dd" :teleport="true" :auto-position="true"
                    class="date-picker-custom" locale="zh-TW" placeholder="請選擇日期" v-model="selectedPackingDate" />
                </div>
              </div>
              <div class="search-field-group">
                <p class="search-field-label">預計開工日</p>
                <div class="date-container">
                  <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                    locale="zh-TW" placeholder="請選擇日期" v-model="selectedPlanBeginDate" />
                </div>
              </div>
              <div class="search-field-group">
                <p class="search-field-label">預計完成日</p>
                <div class="date-container">
                  <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                    locale="zh-TW" placeholder="請選擇日期" v-model="selectedPlanEndDate" />
                </div>
              </div>
              <div class="flex justify-center">
                <button type="button" class="search-button" @click="handleSearchBtn">
                  搜尋
                </button>
              </div>
              <div class="flex justify-center">
                <button type="button" class="save-button" @click="handleSaveBtn">
                  存檔
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

        <div v-if="isLoading" class="attempted-load-container">
          <svg class="animate-spin h-12 w-12" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>載入中...</span>
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

        <div v-if="showPendingTable" class="fixed-table-container">
          <div class="table-container">
            <table class="table-base">
              <thead>
                <tr class="table-header">
                  <th scope="col" class="table-header-cell w-12">
                    <div class="flex items-center">
                      <input type="checkbox" class="table-checkbox" :checked="isAllSelected" @click="selectAll">
                      <div class="group table-header-content cursor-pointer" @click="handleSort('index')">
                        次序
                        <span class="table-sort-icon">
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
                  <th scope="col" class="table-header-cell">排程日期</th>
                  <th scope="col" class="table-header-cell" :class="`w-${getColumnWidth('machine')}`">
                    <div class="group table-header-content cursor-pointer" @click="handleSort('selectedMachine')">
                      機台
                      <span class="table-sort-icon">
                        <svg v-if="sortField === 'selectedMachine' && sortOrder === 'asc'" class="h-5 w-5"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z"
                            clip-rule="evenodd" />
                        </svg>
                        <svg v-else-if="sortField === 'selectedMachine' && sortOrder === 'desc'" class="h-5 w-5"
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
                      <span class="ml-2">{{ getSequenceNumber(index) }}</span>
                    </div>
                  </td>
                  <td class="table-cell-schedule-date">
                    <div class="date-container">
                      <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                      locale="zh-TW" placeholder="請選擇日期" v-model="item.selectedScheduleDate" />
                    </div>
                  </td>
                  <td class="table-cell-machine min-w-[9rem]">
                    <select class="select-base w-full" v-model="item.selectedMachine">
                      <option value="">請選擇機台</option>
                      <option v-for="machine in filteredMachineData" :key="machine.product_line_code"
                        :value="machine.name">
                        {{ machine.name }}
                      </option>
                    </select>
                  </td>
                  <td class="table-cell-packing-date">{{ item.packing_date }}</td>
                  <td class="table-cell-plan-begin-date">{{ item.plan_begin_date }}</td>
                  <td class="table-cell-plan-end-date">{{ item.plan_end_date }}</td>
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
                  <td class="table-cell text-center text-gray-700">{{ item.erp_work_hours }}</td>
                  <td class="table-cell text-center text-gray-700">{{ item.stock }}</td>
                  <td class="table-cell-primary">{{ item.manufacturing_number }}</td>
                </tr>
              </tbody>
            </table>
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
                      <div class="work-time-hours" @click="handleWorkTimeChange(item.name, date.value)">
                        {{ machineWorkHours[item.name]?.[date.value]?.work_hours || 0 }} 小時
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

  <div v-if="showScheduleModal" class="modal-container" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h3>{{ modalMachineName }}</h3>
          <p class="modal-subtitle">{{ modalDate }} 排程資訊</p>
        </div>
        <div class="modal-actions">
          <button @click="handleScheduleChange" class="save-schedule-button"
            :disabled="isSaving || selectedModalRows.size === 0">
            <svg v-if="!isSaving" class="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="animate-spin h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isSaving ? '儲存中...' : '儲存變更' }}
          </button>
          <button @click="closeModal" class="close-button">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div class="modal-body">
        <div v-if="modalScheduleData.length === 0" class="no-data-container">
          <svg class="no-data-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="no-data-text">查無排程資料</p>
        </div>
        <div v-else class="schedule-table-container">
          <table class="schedule-table">
            <thead>
              <tr class="modal-schedule-header">
                <th scope="col" class="modal-schedule-header-cell w-12">
                  <div class="flex items-center">
                    <input type="checkbox" class="table-checkbox" :checked="isAllModalSelected"
                      @change="handleModalSelectAll">
                  </div>
                </th>
                <th scope="col" class="modal-schedule-header-cell">排程日期</th>
                <th scope="col" class="modal-schedule-header-cell">機台</th>
                <th v-for="header in modalHeaderData" :key="header.key" scope="col" class="modal-schedule-header-cell">
                  {{ header.value }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(schedule, index) in modalScheduleData" :key="index" class="schedule-row"
                :class="{ 'schedule-row-selected': selectedModalRows.has(index) }">
                <td class="schedule-cell">
                  <div class="flex items-center">
                    <input type="checkbox" class="table-checkbox" :checked="selectedModalRows.has(index)"
                      @change="handleModalRowSelect(index)">
                  </div>
                </td>
                <td class="schedule-cell">
                  <div class="date-container">
                    <VueDatePicker format="yyyy-MM-dd" :teleport="true" :auto-position="true" class="date-picker-custom"
                      locale="zh-TW" v-model="schedule.selectedDate" />
                  </div>
                </td>
                <td class="schedule-cell">
                  <select class="select-base" v-model="schedule.selectedMachine">
                    <option value="" disabled>請選擇機台</option>
                    <option v-for="machine in filteredMachineData" :key="machine.product_line_code"
                      :value="machine.name">
                      {{ machine.name }}
                    </option>
                  </select>
                </td>
                <td class="schedule-cell">{{ schedule.product_number }}</td>
                <td class="schedule-cell schedule-cell-name">{{ schedule.product_name }}</td>
                <td class="schedule-cell text-center">
                  <span class="schedule-qty-badge">{{ schedule.plan_qty }}</span>
                </td>
                <td class="schedule-cell text-center">
                  <span class="schedule-hours-badge">{{ schedule.actual_qty }}</span>
                </td>
                <td class="schedule-cell">
                  <span class="schedule-mfg-badge">{{ schedule.changed_schedule_qty }}</span>
                </td>
                <td class="schedule-cell">
                  <span class="schedule-mfg-badge">{{ schedule.changed_manual_work_hours }}</span>
                </td>
                <td class="schedule-cell">
                  <span class="schedule-mfg-badge">{{ schedule.total_work_hours }}</span>
                </td>
                <td class="schedule-cell">
                  <span class="schedule-mfg-badge">{{ schedule.manufacturing_number }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
