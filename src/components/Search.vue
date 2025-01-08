<template>
  <div class="search-container">
    <div class="search-header">
      <!-- 解析度在 1920px 以上 -->
      <div class="hidden 2xl:block">
        <div class="flex items-center gap-6">
          <div class="search-field-group">
            <p class="search-field-label">產線</p>
            <CustomSelect type="productLine" class="w-full" />
          </div>
          <!-- <div class="search-field-group">
            <p class="search-field-label">機台</p>
            <CustomSelect type="machine" class="w-full" />
          </div> -->
          <div class="search-field-group">
            <p class="search-field-label">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="search-field-group">
            <p class="search-field-label">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="search-field-group">
            <p class="search-field-label">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
          <div class="flex justify-center">
            <CustomButton :showSearch="true" />
          </div>
          <div class="flex justify-center">
            <button class="reset-button" @click="syncErpData">
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
          <div class="search-responsive-field">
            <p class="search-responsive-label">產線</p>
            <CustomSelect type="productLine" class="w-full" />
          </div>
          <div class="search-responsive-field">
            <p class="search-responsive-label">機台</p>
            <CustomSelect type="machine" class="w-full" />
          </div>
          <div class="search-responsive-field">
            <p class="search-responsive-label">客戶</p>
            <CustomInput :showCustomer="true" class="w-full" />
          </div>
          <div class="search-responsive-field">
            <p class="search-responsive-label">訂單編號</p>
            <CustomInput :showOrderNumber="true" class="w-full" />
          </div>
          <div class="search-responsive-field">
            <p class="search-responsive-label">包裝日期</p>
            <Date :showDate="true" :isRange="true" class="w-full" />
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <CustomButton :showSearch="true" />
        </div>
        <div class="flex justify-center">
          <button class="reset-button" @click="syncErpData">
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
import { syncErpDataApi } from '@/api'

const syncErpData = async () => {
  await syncErpDataApi()
}
</script>
