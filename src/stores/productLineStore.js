import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProductLinesApi } from '@/api'

export const useProductLineStore = defineStore('productLine', () => {
  const productLines = ref([])
  const selectedProductLine = ref('')
  const isInitialized = ref(false)

  const fetchProductLines = async () => {
    if (isInitialized.value) return

    const response = await getProductLinesApi()
    productLines.value = response.data.data
    isInitialized.value = true
  }

  return {
    productLines,
    selectedProductLine,
    fetchProductLines,
    isInitialized
  }
})
