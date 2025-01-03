<template>
  <Disclosure as="nav" class="nav-container" v-slot="{ open }">
    <div class="nav-inner">
      <div class="nav-header">
        <div class="nav-mobile-menu">
          <DisclosureButton class="nav-mobile-button">
            <span class="sr-only">開啟主選單</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="nav-brand">
          <div class="nav-logo">
            <a href="/Default">
              <img class="nav-logo-image" src="http://192.168.199.166/APS3/img/logo.png?color=indigo&shade=600"
                alt="Your Company" />
            </a>
          </div>
          <div class="nav-desktop-links">
            <router-link to="/Default" class="nav-link" active-class="nav-link-active">未排程</router-link>
            <router-link to="/PS_MK_Mac" class="nav-link" active-class="nav-link-active">機台排程</router-link>
            <router-link to="/PS_MK_List" class="nav-link" active-class="nav-link-active">總排程</router-link>
          </div>
          <div class="nav-selectors" v-if="showSelectors">
            <CustomSelect :showSelectProductLine="true" class="nav-selector nav-selector-first" />
            <CustomSelect :showSelectMachine="true" class="nav-selector" />
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="nav-mobile-panel">
      <div class="nav-mobile-links">
        <router-link to="/Default" class="nav-mobile-link" active-class="nav-link-active">未排程</router-link>
        <router-link to="/PS_MK_Mac" class="nav-mobile-link" active-class="nav-link-active">機台排程</router-link>
        <router-link to="/PS_MK_List" class="nav-mobile-link" active-class="nav-link-active">總排程</router-link>
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
