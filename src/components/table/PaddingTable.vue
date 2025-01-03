<template>
  <div class="table-container">
    <table class="table-base">
      <thead>
        <tr class="table-header">
          <th scope="col" class="table-header-cell w-12">
            <div class="flex items-center">
              <input type="checkbox" class="table-checkbox" :checked="isAllSelected" @change="handleSelectAll">
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
          <th scope="col" class="table-header-cell w-20">
            <div class="group table-header-content">
              包裝日
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              客戶代號
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              訂單號碼
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-20">
            <div class="group table-header-content">
              訂單序號
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-32">
            <div class="group table-header-content">
              品號
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="min-w-[300px]">
            <div class="group table-header-content">
              品名-規格
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              預計產量
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              已生產數
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-32">
            <div class="group table-header-content">
              排產數量
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-32">
            <div class="group table-header-content">
              手動工時
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              ERP工時
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-24">
            <div class="group table-header-content">
              庫存
              <span class="table-sort-icon">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="table-header-cell w-32">
            <div class="group table-header-content">
              製令單號
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
        <tr v-for="(item, index) in tableData"
            :key="index"
            class="table-row"
            :class="{ 'table-row-selected': selectedRows.has(index) }">
          <td class="table-cell">
            <div class="flex items-center">
              <input type="checkbox"
                     class="table-checkbox"
                     :checked="selectedRows.has(index)"
                     @change="handleRowSelect(index)">
              <span class="ml-2">{{ index + 1 }}</span>
            </div>
          </td>
          <td class="table-cell">
            <div class="table-cell-highlight">
              {{ item.packageDate }}
            </div>
          </td>
          <td class="table-cell text-sm text-gray-700">{{ item.customerCode }}</td>
          <td class="table-cell text-sm text-gray-700">{{ item.orderNumber }}</td>
          <td class="table-cell text-sm text-gray-700">{{ item.orderSeq }}</td>
          <td class="table-cell text-sm text-gray-700">{{ item.productId }}</td>
          <td class="table-cell text-sm text-gray-700 whitespace-pre-line">{{ item.productName }}</td>
          <td class="table-cell text-center">
            <div class="table-cell-success">{{ item.plannedQuantity }}</div>
          </td>
          <td class="table-cell text-center">
            <div class="table-cell-success">{{ item.producedQuantity }}</div>
          </td>
          <td class="table-cell">
            <div class="table-quantity-control">
              <button class="table-quantity-button-increase"
                @click="handleScheduledQuantityChange(item, 'increase')">
                +
              </button>
              <input type="number" v-model="item.scheduledQuantity" min="0"
                @input="$event.target.value = $event.target.value.replace(/[^0-9]/g, '')"
                class="table-quantity-input">
              <button class="table-quantity-button-decrease"
                @click="handleScheduledQuantityChange(item, 'decrease')">
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
            <div class="table-cell-primary">{{ item.orderCode }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
  <div class="flex justify-end items-center mt-4 gap-4">
    <p class="text-sm font-medium text-slate-600 whitespace-nowrap">排程日期</p>
    <Date :showDate="true" class="w-[240px]" />
    <CustomButton :showSave="true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomButton from '../CustomButton.vue'
import Date from '../Date.vue'
import Pagination from '../Pagination.vue'

const tableData = ref([
  {
    packageDate: '12/10',
    customerCode: 'D01-MIT',
    orderNumber: '202406067',
    orderSeq: '0050',
    productId: 'B3T25TK3T-N-PT50',
    productName: 'CR-V 插入式BIT套筒 1/4"T25*37L(南孔)\n灰盒S01/50,TEKTON SHB04225.R01',
    plannedQuantity: 300,
    producedQuantity: 0,
    scheduledQuantity: 300,
    manualWorkHours: 1230,
    erpWorkHours: 1230,
    stock: 100,
    orderCode: 'M021-202407019H'
  },
  {
    packageDate: '12/13',
    customerCode: 'E42-3518',
    orderNumber: '202408002',
    orderSeq: '0020',
    productId: 'B8T30BW3Q-N-B10',
    productName: 'CR-V 插入式BIT套筒 1/2"5/16"T30*100L(南孔)\n彩盒S02/10/100,Beta WORKER BW 920TX-L 30(00009206534)80548093155222',
    plannedQuantity: 800,
    producedQuantity: 0,
    scheduledQuantity: 800,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202408034I'
  },
  {
    packageDate: '12/13',
    customerCode: 'B07-EDE',
    orderNumber: '202409004',
    orderSeq: '0002',
    productId: 'FA-BM3017A6-M',
    productName: '短套筒板手組(6P) 3/8"17PC(MM)\n標準J01/05,format,60560010(4317784123402)富爾特第1',
    plannedQuantity: 2,
    producedQuantity: 0,
    scheduledQuantity: 2,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202409025I'
  },
  {
    packageDate: '12/09',
    customerCode: 'B07-EDE',
    orderNumber: '202409004',
    orderSeq: '0002',
    productId: 'FA-BM3017A6-M',
    productName: '短套筒板手組(6P) 3/8"17PC(MM)\n標準J01/05,format,60560010(4317784123402)富爾特第1',
    plannedQuantity: 2,
    producedQuantity: 0,
    scheduledQuantity: 2,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202409025I'
  },
  {
    packageDate: '12/10',
    customerCode: 'B07-EDE',
    orderNumber: '202409004',
    orderSeq: '0002',
    productId: 'FA-BM3017A6-M',
    productName: '短套筒板手組(6P) 3/8"17PC(MM)\n標準J01/05,format,60560010(4317784123402)富爾特第1',
    plannedQuantity: 2,
    producedQuantity: 0,
    scheduledQuantity: 2,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202409025I'
  },
  {
    packageDate: '12/11',
    customerCode: 'B07-EDE',
    orderNumber: '202409004',
    orderSeq: '0002',
    productId: 'FA-BM3017A6-M',
    productName: '短套筒板手組(6P) 3/8"17PC(MM)\n標準J01/05,format,60560010(4317784123402)富爾特第1',
    plannedQuantity: 2,
    producedQuantity: 0,
    scheduledQuantity: 2,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202409025I'
  },
  {
    packageDate: '12/12',
    customerCode: 'B07-EDE',
    orderNumber: '202409004',
    orderSeq: '0002',
    productId: 'FA-BM3017A6-M',
    productName: '短套筒板手組(6P) 3/8"17PC(MM)\n標準J01/05,format,60560010(4317784123402)富爾特第1',
    plannedQuantity: 2,
    producedQuantity: 0,
    scheduledQuantity: 2,
    manualWorkHours: 2000,
    erpWorkHours: 2000,
    stock: 100,
    orderCode: 'M021-202409025I'
  },
  {
    packageDate: '12/09',
    customerCode: 'B02-MET',
    orderNumber: '202410013',
    orderSeq: '0008',
    productId: 'KN-ADM4012V6-B',
    productName: '長柄動套筒組(6P) 1/2"12PC(MM)\n(改策盒)1/05,KNOVA KN6500-MP',
    plannedQuantity: 300,
    producedQuantity: 0,
    scheduledQuantity: 300,
    manualWorkHours: 2550,
    erpWorkHours: 2550,
    stock: 100,
    orderCode: 'M021-202410028J'
  }
])

// 新增選擇相關的功能
const selectedRows = ref(new Set())

// 處理單行選擇
const handleRowSelect = (index) => {
  if (selectedRows.value.has(index)) {
    selectedRows.value.delete(index)
  } else {
    selectedRows.value.add(index)
  }
}

// 處理全選
const handleSelectAll = () => {
  if (selectedRows.value.size === tableData.value.length) {
    selectedRows.value.clear()
  } else {
    selectedRows.value = new Set(tableData.value.map((_, index) => index))
  }
}

// 檢查是否全選
const isAllSelected = computed(() => {
  return tableData.value.length > 0 && selectedRows.value.size === tableData.value.length
})

// 處理排產數量的增減
const handleScheduledQuantityChange = (item, type) => {
  if (type === 'increase') {
    item.scheduledQuantity = Number(item.scheduledQuantity) + 1
  } else if (type === 'decrease' && item.scheduledQuantity > 0) {
    item.scheduledQuantity = Number(item.scheduledQuantity) - 1
  }
}

// 處理手動工時的增減
const handleManualWorkHoursChange = (item, type) => {
  if (type === 'increase') {
    item.manualWorkHours = Number(item.manualWorkHours) + 1
  } else if (type === 'decrease' && item.manualWorkHours > 0) {
    item.manualWorkHours = Number(item.manualWorkHours) - 1
  }
}
</script>
