import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMachinesApi } from '@/api'

export const useMachineStore = defineStore('machine', () => {
  const machines = ref([])
  const selectedMachine = ref('')

  const updateMachines = async (productLineCode) => {
    selectedMachine.value = ''
    const response = await getMachinesApi(productLineCode)
    machines.value = response.data.data
  }

  return {
    machines,
    selectedMachine,
    updateMachines
  }
})
