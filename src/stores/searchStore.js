import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    showTable: false,
    hasAttemptedLoad: false,
    loading: false,
  }),

  actions: {
    setShowTable(value) {
      this.showTable = value
    },
    setHasAttemptedLoad(value) {
      this.hasAttemptedLoad = value
    },
    setLoading(value) {
      this.loading = value
    }
  }
})
