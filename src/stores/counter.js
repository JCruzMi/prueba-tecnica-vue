import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRemindersStore = defineStore('counter', () => {
  const reminders = reactive({
    reminders: {}
  })

  function addReminder(date, reminder) {
    if (!reminders.reminders[date]) {
      reminders.reminders[date] = []
    }
    reminders.reminders[date].push(reminder)
  }

  function getReminders(date) {
    if (!reminders.reminders[date]) return []
    return reminders.reminders[date].slice().sort((a, b) => a.time.localeCompare(b.time))
  }

  function deleteReminder(date, reminderIndex) {
    if (reminders.reminders[date]) {
      reminders.reminders[date].slice().sort((a, b) => a.time.localeCompare(b.time))
      reminders.reminders[date].splice(reminderIndex, 1)
      if (reminders.reminders[date].length === 0) {
        delete reminders.reminders[date]
      } else {
        reminders.reminders[date].sort((a, b) => a.time.localeCompare(b.time))
      }
    }
  }
  function getRemindersCountForMonth(year, month) {
    const counts = {}
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      counts[formattedDate] = reminders.reminders[formattedDate]
        ? reminders.reminders[formattedDate].length
        : 0
    }

    return counts
  }
  function getRemindersForMonth(year, month) {
    const remindersForMonth = {}
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      remindersForMonth[formattedDate] = reminders.reminders[formattedDate]
        ? getReminders(formattedDate)
        : []
    }

    return remindersForMonth
  }

  return {
    reminders,
    addReminder,
    getReminders,
    deleteReminder,
    getRemindersCountForMonth,
    getRemindersForMonth
  }
})
