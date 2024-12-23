<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <!-- 只在手機版顯示漢堡選單 (sm:hidden) -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">開啟主選單</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:justify-start">
          <div class="flex shrink-0 items-center">
            <a href="/Default">
              <img class="h-8 w-auto" src="http://192.168.199.166/APS3/img/logo.png?color=indigo&shade=600"
                alt="Your Company" />
            </a>
          </div>
          <!-- 在平板以上尺寸顯示一般導航 (sm:flex) -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/Default" active-class="border-indigo-500 text-gray-900"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600">未排程</router-link>
            <router-link to="/PS_MK_Mac" active-class="border-indigo-500 text-gray-900"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600">機台排程</router-link>
            <router-link to="/PS_MK_List" active-class="border-indigo-500 text-gray-900"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600">總排程</router-link>
          </div>
          <!-- 新增產線和機台選擇器 -->
          <div class="hidden sm:flex sm:items-center sm:space-x-4 sm:ml-auto" v-if="showSelectors">
            <CustomSelect :showSelectProductLine="true" class="w-40 mr-8" />
            <CustomSelect :showSelectMachine="true" class="w-40" />
          </div>
        </div>
      </div>
    </div>

    <!-- 只在手機版顯示下拉選單 (sm:hidden) -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-2">
        <router-link to="/Default" active-class="border-indigo-500 text-gray-900"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-700">未排程</router-link>
        <router-link to="/PS_MK_Mac" active-class="border-indigo-500 text-gray-900"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-700">機台排程</router-link>
        <router-link to="/PS_MK_List" active-class="border-indigo-500 text-gray-900"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-700">總排程</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import CustomSelect from './CustomSelect.vue'

const props = defineProps({
  showSelectors: {
    type: Boolean,
    default: false
  }
})
</script>
