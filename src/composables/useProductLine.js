import { ref } from 'vue'
import { fetchProductLineData } from '@/api/getProductLineDataApi'

export function useProductLine() {
  // 定義響應式狀態
  const productLineData = ref([])
  const machineData = ref([])
  const selectedProductLine = ref('')
  const selectedMachine = ref('')
  const isLoading = ref(false)

  // 載入產線和機台資料
  const loadProductLineData = async () => {
    isLoading.value = true
    try {
      const { data, error } = await fetchProductLineData()
      if (error) throw error

      // 格式化 API 回傳的資料
      const formattedData = data.map(line => ({
        productLineName: line.productLineName,
        machines: line.machines // 保持原始機台代碼格式
      }))

      productLineData.value = formattedData
      machineData.value = []

      return { formattedData, machines: [] }
    } catch (error) {
      console.error('Failed to load product line data:', error)
      return { error }
    } finally {
      isLoading.value = false
    }
  }

  // 根據產線更新機台列表
  const updateMachinesByProductLine = (productLine) => {
    if (!productLine) {
      machineData.value = []
      return []
    }

    const line = productLineData.value.find(
      line => line.productLineName === productLine
    )
    // 直接使用機台代碼陣列
    const machines = line?.machines || []
    machineData.value = machines
    return machines
  }

  return {
    // 狀態
    productLineData,
    machineData,
    selectedProductLine,
    selectedMachine,
    isLoading,
    // 方法
    loadProductLineData,
    updateMachinesByProductLine
  }
}
