<template>
  <!-- 解析度在 1920px 以上 -->
  <div class="hidden 2xl:block">
    <div class="overflow-x-auto bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr class="bg-gradient-to-r from-zinc-700 via-gray-800 to-slate-900">
            <th scope="col" class="w-12 px-1.5 py-2 text-left text-sm font-semibold text-white">
              <div class="flex items-center">
                <div class="group inline-flex items-center cursor-pointer ml-2 whitespace-nowrap">
                  #
                  <span class="ml-2 flex-none rounded text-gray-400">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </th>
            <th scope="col" class="w-20 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                機台
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-20 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                包裝日
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-24 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                客戶代號
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-24 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                訂單號碼
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-20 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                訂單序號
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-32 px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                品號
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="min-w-[500px] px-2 py-2.5 text-left text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap">
                品名-規格
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-16 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                預計產量
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-16 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                已生產數
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-20 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                排產數量
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-20 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                手動工時
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-16 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                ERP工時
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-16 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                庫存
                <span class="ml-2 flex-none rounded text-gray-400">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th scope="col" class="w-24 px-2 py-2.5 text-center text-sm font-semibold text-white">
              <div class="group inline-flex items-center cursor-pointer whitespace-nowrap justify-center">
                製令單號
                <span class="ml-2 flex-none rounded text-gray-400">
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
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="(item, index) in tableData" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-1.5 py-4 text-sm text-gray-900">
              <div class="flex items-center">
                <span class="ml-2">{{ index + 1 }}</span>
              </div>
            </td>
            <td class="px-1.5 py-4 text-sm text-gray-700">{{ item.machine }}</td>
            <td class="px-1.5 py-4">
              <div class="px-1 py-0.5 bg-red-50 text-red-600 rounded text-sm font-medium w-fit">
                {{ item.packageDate }}
              </div>
            </td>
            <td class="px-1.5 py-4 text-sm text-gray-700">{{ item.customerCode }}</td>
            <td class="px-1.5 py-4 text-sm text-gray-700">{{ item.orderNumber }}</td>
            <td class="px-1.5 py-4 text-sm text-gray-700">{{ item.orderSeq }}</td>
            <td class="px-1.5 py-4 text-sm text-gray-700">{{ item.productId }}</td>
            <td class="px-1.5 py-4 text-sm text-gray-700 whitespace-pre-line">{{ item.productName }}</td>
            <td class="px-1.5 py-4 text-center">
              <div class="text-emerald-600 font-medium">{{ item.plannedQuantity }}</div>
            </td>
            <td class="px-1.5 py-4 text-center">
              <div class="text-sky-600 font-medium">{{ item.producedQuantity }}</div>
            </td>
            <td class="px-1.5 py-4 text-center">
              <div class="text-gray-900 font-medium">{{ item.scheduledQuantity }}</div>
            </td>
            <td class="px-1.5 py-4 text-center">
              <div class="text-gray-900 font-medium">{{ item.manualWorkHours }}</div>
            </td>
            <td class="px-1.5 py-4 text-center text-gray-700">{{ item.erpWorkHours }}</td>
            <td class="px-1.5 py-4 text-center text-gray-700">{{ item.stock }}</td>
            <td class="px-1.5 py-4">
              <div class="px-1 py-0.5 bg-indigo-50 text-indigo-600 rounded text-sm font-medium whitespace-nowrap">
                {{ item.orderCode }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  </div>

  <!-- 解析度在 1920px 以下 -->
  <div class="block 2xl:hidden">
    <div class="space-y-4">
      <div v-for="(item, index) in tableData" :key="index"
        class="bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5 p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <span class="ml-2 text-sm font-medium">#{{ index + 1 }}</span>
          </div>
          <div class="space-y-1">
            <div class="text-xs text-gray-500">包裝日</div>
            <div class="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-sm font-medium inline-block">
              {{ item.packageDate }}
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1 bg-gray-50 p-2 rounded-lg">
              <div class="text-xs text-gray-500">客戶代號</div>
              <div class="text-sm">{{ item.customerCode }}</div>
            </div>
            <div class="space-y-1 bg-gray-50 p-2 rounded-lg">
              <div class="text-xs text-gray-500">品號</div>
              <div class="text-sm">{{ item.productId }}</div>
            </div>
          </div>

          <div class="space-y-1 bg-gray-50 p-2 rounded-lg">
            <div class="text-xs text-gray-500">品名-規格</div>
            <div class="text-sm">{{ item.productName }}</div>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div class="text-center bg-emerald-50 p-2 rounded-lg">
              <div class="text-xs text-emerald-600">預計產量</div>
              <div class="text-emerald-600 font-medium">{{ item.plannedQuantity }}</div>
            </div>
            <div class="text-center bg-sky-50 p-2 rounded-lg">
              <div class="text-xs text-sky-600">已生產數</div>
              <div class="text-sky-600 font-medium">{{ item.producedQuantity }}</div>
            </div>
            <div class="text-center bg-indigo-50 p-2 rounded-lg">
              <div class="text-xs text-indigo-600">排產數量</div>
              <input type="text" v-model="item.scheduledQuantity"
                class="w-full text-center bg-white border border-indigo-200 rounded-md text-indigo-600 font-medium">
            </div>
          </div>

          <div class="flex justify-center">
            <div class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
              {{ item.orderCode }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from '../Pagination.vue';

const tableData = ref([
  {
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
    machine: '3-WS02',
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
</script>
