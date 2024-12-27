<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200/60 mb-4 backdrop-blur-sm">
    <div class="px-3 sm:px-4 md:px-6 py-4 sm:py-5 bg-white/50 border-b border-slate-200/60">
      <!-- 解析度在 1920px 以上 -->
      <div class="hidden 2xl:block">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">產線</p>
            <CustomSelect :showSelectProductLine="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">機台</p>
            <CustomSelect :showSelectMachine="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
          <div class="flex justify-center">
            <CustomButton :showSearch="true" />
          </div>
          <div class="flex justify-center">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none ">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 解析度在 1920px 以下 -->
      <div class="block 2xl:hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto">
            <p class="text-sm font-medium text-slate-600 mb-1.5">產線</p>
            <CustomSelect :showSelectProductLine="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto">
            <p class="text-sm font-medium text-slate-600 mb-1.5">機台</p>
            <CustomSelect :showSelectMachine="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto">
            <p class="text-sm font-medium text-slate-600 mb-1.5">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto">
            <p class="text-sm font-medium text-slate-600 mb-1.5">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto">
            <p class="text-sm font-medium text-slate-600 mb-1.5">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <CustomButton :showSearch="true" />
        </div>
        <div class="flex justify-center">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none ">
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
</template>

<script setup>
import CustomSelect from './CustomSelect.vue'
import Date from './Date.vue'
import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'
</script>
