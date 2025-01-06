import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMachinesApi } from '@/api'
import { useProductLineStore } from './productLineStore'

export const useMachineStore = defineStore('machine', () => {
  const machines = ref([])
  const selectedMachine = ref('')
  const productLineStore = useProductLineStore()

  const updateMachines = async (productLineId) => {
    productLineStore.selectedProductLine = productLineId
    selectedMachine.value = ''
    const response = await getMachinesApi(productLineId)
    machines.value = response.data.data
  }

  return {
    machines,
    selectedMachine,
    updateMachines
  }
})
