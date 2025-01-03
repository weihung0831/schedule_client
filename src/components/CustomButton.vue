<template>
  <div>
    <button
      type="button"
      v-if="showSearch"
      class="search-button"
      @click="handleClick"
    >
      搜尋
    </button>
    <button
      type="button"
      v-if="showSave"
      class="save-button"
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
