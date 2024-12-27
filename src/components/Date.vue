<template>
  <div v-if="showDate" class="w-full">
    <input v-if="!isRange" type="date" v-model="dateStore.singleDate" class="date-input w-full text-center" />

    <VueDatePicker v-if="isRange" v-model="dateStore.dateRange" range format="yyyy-MM-dd" :teleport="true"
      :auto-position="true" :hide-input-icon="true" class="date-picker-custom" />
  </div>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useDateStore } from '../stores/dateStore'

const props = defineProps({
  showDate: Boolean,
  isRange: Boolean,
  modelValue: {
    type: [Date, Array, String],
    default: null
  }
})

const dateStore = useDateStore()

// 如果有初始值，直接設置
if (props.modelValue) {
  if (props.isRange) {
    dateStore.setDateRange(props.modelValue)
  } else {
    dateStore.setSingleDate(props.modelValue)
  }
} else if (props.isRange) {
  dateStore.initDateRange()
}
</script>
