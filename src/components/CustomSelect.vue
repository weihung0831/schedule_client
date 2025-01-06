<template>
  <div class="select-container">
    <select
      v-if="type === 'productLine'"
      class="select-base"
      :value="readState ? productLineStore.selectedProductLine : ''"
      @change="onProductLineChange"
    >
      <option value="">請選擇生產線</option>
      <option v-for="line in productLineStore.productLines" :value="line.id">
        {{ line.name }}
      </option>
    </select>

    <select
      v-if="type === 'machine'"
      class="select-base"
      :value="readState ? machineStore.selectedMachine : ''"
      @change="onMachineChange"
    >
      <option value="">請選擇機台</option>
      <option v-for="machine in machineStore.machines" :value="machine.id">
        {{ machine.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useMachineStore } from '@/stores/machineStore'
import { useProductLineStore } from '@/stores/productLineStore'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['productLine', 'machine'].includes(value)
  },
  readState: {
    type: Boolean,
    default: true
  }
})

const machineStore = useMachineStore()
const productLineStore = useProductLineStore()

const onProductLineChange = (event) => {
  if (props.readState) {
    machineStore.updateMachines(event.target.value)
  }
}

const onMachineChange = (event) => {
  if (props.readState) {
    machineStore.selectedMachine = event.target.value
  }
}
</script>
