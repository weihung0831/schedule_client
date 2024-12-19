<template>
  <div class="flex flex-row">
    <select v-if="showSelectMachine" class="select-base text-center">
      <option value="">請選擇機台</option>
      <option></option>
    </select>

    <select v-if="showSelectProductLine" class="select-base text-center">
      <option value="">請選擇生產線</option>
      <option>
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  showSelectMachine: Boolean,
  showSelectProductLine: Boolean,
  modelValue: String
})
</script>
