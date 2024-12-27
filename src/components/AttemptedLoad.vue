<template>
  <!-- 加載狀態顯示 -->
  <!-- <div v-if="loading" class="flex flex-col items-center justify-center h-64 text-slate-500">
    <span>載入中...</span>
  </div> -->
  <!-- 初始提示 -->
  <div v-if="searchStore.hasAttemptedLoad"
    class="flex flex-col items-center justify-center h-64 text-slate-500">
    <svg class="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
    <span>點擊查詢資料</span>
  </div>
</template>

<script setup>
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()
</script>
