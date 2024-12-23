<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200/60 mb-4 backdrop-blur-sm">
    <div class="px-3 sm:px-4 md:px-6 py-4 sm:py-5 bg-white/50 border-b border-slate-200/60">
      <!-- 解析度在 1920px 以上 -->
      <div class="hidden 2xl:block">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2" v-if="showProductLine">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">產線</p>
            <CustomSelect :showSelectProductLine="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2" v-if="showMachine">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">機台</p>
            <CustomSelect :showSelectMachine="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2" v-if="showCustomer">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2" v-if="showOrderNumber">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="flex items-center gap-2" v-if="showPackingDate">
            <p class="text-sm font-medium text-slate-600 whitespace-nowrap">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
          <div class="flex justify-center">
            <CustomButton :showSearch="true" />
          </div>
        </div>
      </div>

      <!-- 解析度在 1920px 以下 -->
      <div class="block 2xl:hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto" v-if="showProductLine">
            <p class="text-sm font-medium text-slate-600 mb-1.5">產線</p>
            <CustomSelect :showSelectProductLine="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto" v-if="showMachine">
            <p class="text-sm font-medium text-slate-600 mb-1.5">機台</p>
            <CustomSelect :showSelectMachine="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto" v-if="showCustomer">
            <p class="text-sm font-medium text-slate-600 mb-1.5">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto" v-if="showOrderNumber">
            <p class="text-sm font-medium text-slate-600 mb-1.5">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="flex flex-col items-start w-full max-w-[240px] mx-auto" v-if="showPackingDate">
            <p class="text-sm font-medium text-slate-600 mb-1.5">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <CustomButton :showSearch="true" />
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

// 定義元件屬性
defineProps({
  showMachine: Boolean,      // 是否顯示機台選擇器
  showProductLine: Boolean,  // 是否顯示產線選擇器
  showCustomer: Boolean,     // 是否顯示客戶輸入
  showPackingDate: Boolean,  // 是否顯示包裝日期
  showOrderNumber: Boolean   // 是否顯示訂單編號
})
</script>
