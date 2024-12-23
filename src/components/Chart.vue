<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
    <div class="bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div class="relative w-full max-w-[12rem] h-auto aspect-square mx-auto chart-container">
        <Doughnut
          :data="completionChartData"
          :options="chartOptions"
        />
        <div class="percentage-container">
          <div class="percentage">{{ formattedCompletionRate }}</div>
          <div class="label">達成率</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div class="relative w-full max-w-[12rem] h-auto aspect-square mx-auto chart-container">
        <Doughnut
          :data="executionChartData"
          :options="chartOptions"
        />
        <div class="percentage-container">
          <div class="percentage">{{ formattedExecutionRate }}</div>
          <div class="label">執行效率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// 達成率和執行效率的數值
const completionRate = ref(0.75)
const executionRate = ref(0.85)

// 圖表配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '85%',
  rotation: -90,
  circumference: 360,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  },
  elements: {
    arc: {
      borderWidth: 0,
      borderRadius: 30
    }
  }
}

// 達成率圖表數據
const completionChartData = computed(() => ({
  labels: ['達成率', '未完成'],
  datasets: [
    {
      data: [completionRate.value * 100, 100 - (completionRate.value * 100)],
      backgroundColor: [
        'rgb(37, 99, 235)',
        'rgb(243, 244, 246)'
      ],
      borderRadius: {
        outerStart: 25,
        outerEnd: 25,
        innerStart: 25,
        innerEnd: 25
      }
    }
  ]
}))

// 執行效率圖表數據
const executionChartData = computed(() => ({
  labels: ['執行效率', '未完成'],
  datasets: [
    {
      data: [executionRate.value * 100, 100 - (executionRate.value * 100)],
      backgroundColor: [
        'rgb(37, 99, 235)',
        'rgb(243, 244, 246)'
      ],
      borderRadius: {
        outerStart: 25,
        outerEnd: 25,
        innerStart: 25,
        innerEnd: 25
      }
    }
  ]
}))

// 格式化顯示的百分比
const formattedCompletionRate = computed(() => `${Math.round(completionRate.value * 100)}%`)
const formattedExecutionRate = computed(() => `${Math.round(executionRate.value * 100)}%`)
</script>
