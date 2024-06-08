import { defineStore } from 'pinia'

export const useRemindersStore = defineStore('reminder', {
  state: () => ({
    reminders: {}
  }),
  actions: {
    addReminder(date, reminder) {
      if (!this.reminders[date]) {
        this.reminders[date] = []
      }
      this.reminders[date].push(reminder)
    },
    getReminders(date) {
      if (!this.reminders[date]) return []
      return this.reminders[date].slice().sort((a, b) => a.time.localeCompare(b.time))
    },
    deleteReminder(date, reminderIndex) {
      if (this.reminders[date]) {
        this.reminders[date].splice(reminderIndex, 1)
        if (this.reminders[date].length === 0) {
          delete this.reminders[date]
        }
      }
    },
    getRemindersCountForMonth(year, month) {
      const counts = {}
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        counts[formattedDate] = this.reminders[formattedDate]
          ? this.reminders[formattedDate].length
          : 0
      }

      return counts
    }
  },
  persist: true
})
