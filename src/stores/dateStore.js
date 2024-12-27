import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', {
  state: () => ({
    singleDate: new Date().toISOString().split('T')[0],
    dateRange: null,
    showTable: false,
    showChart: false,
  }),

  actions: {
    setSingleDate(date) {
      this.singleDate = date
    },

    setDateRange(range) {
      this.dateRange = range
    },

    initDateRange() {
      const startDate = new Date()
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
      this.dateRange = [startDate, endDate]
      return this.dateRange
    },

    selectDate(date) {
      this.singleDate = date
    },

    nextDate() {
      const date = new Date(this.singleDate)
      date.setDate(date.getDate() + 1)
      this.singleDate = date.toISOString().split('T')[0]
    },

    previousDate() {
      const date = new Date(this.singleDate)
      date.setDate(date.getDate() - 1)
      this.singleDate = date.toISOString().split('T')[0]
    },

    setShowTable(value) {
      this.showTable = value
    },

    setShowChart(value) {
      this.showChart = value
    },
  }
})
