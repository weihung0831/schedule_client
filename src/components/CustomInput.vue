<template>
  <div>
    <input v-if="showCustomer" type="text" name="customer" aria-label="Customer" class="input-base w-full text-center"
      placeholder="請輸入客戶代號" />
    <input v-if="showOrderNumber" type="text" name="orderNumber" aria-label="Order Number"
      class="input-base w-full text-center" placeholder="請輸入訂單編號" />
  </div>
</template>

<script setup>
defineProps({
  showCustomer: Boolean,
  showOrderNumber: Boolean,
  modelValue: String
})
</script>
