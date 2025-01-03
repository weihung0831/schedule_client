<template>
  <div class="select-container">
    <select v-if="showSelectMachine" class="select-base">
      <option value="">請選擇機台</option>
      <option>3-WS01</option>
      <option>3-WS02</option>
      <option>3-WS03</option>
      <option>3-WS04</option>
      <option>3-WS05</option>
    </select>

    <select v-if="showSelectProductLine" class="select-base">
      <option value="">請選擇生產線</option>
      <option>產線1</option>
      <option>產線2</option>
      <option>產線3</option>
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
