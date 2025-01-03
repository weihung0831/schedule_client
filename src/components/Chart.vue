<template>
  <div class="charts-grid">
    <div class="chart-card">
      <div class="chart-wrapper">
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

    <div class="chart-card">
      <div class="chart-wrapper">
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
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip
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
