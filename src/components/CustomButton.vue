<template>
  <div>
    <button
      type="button"
      v-if="showSearch"
      class="button-base w-24"
      @click="handleClick"
    >
      搜尋
    </button>
    <button
      type="button"
      v-if="showSave"
      class="button-base-save w-24"
    >
      存檔
    </button>
  </div>
</template>

<script setup>
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()

defineProps({
  showSearch: {
    type: Boolean,
    default: false
  },
  showSave: {
    type: Boolean,
    default: false
  }
})

const handleClick = () => {
  searchStore.setShowTable(true)
  searchStore.setHasAttemptedLoad(false)
}
</script>
