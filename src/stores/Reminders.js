import { defineStore } from 'pinia'

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    reminders: []
  }),
  actions: {
    addReminder(reminder) {
      this.reminders.push(reminder)
    }
  }
})
