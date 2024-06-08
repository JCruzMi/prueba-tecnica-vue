<template>
  <div class="calendar-grid">
    <Button
      v-for="day in days"
      :key="day.date"
      :class="[
        'size-full hover:bg-secondary w-14 h-14 transition-all flex items-center justify-center text-gray-12 text-sm font-semibold cursor-pointer bg-secondary hover:ring-2 hover:ring-secondary-foreground',
        { 'bg-primary-foreground ': !day.isAvailable },
        { 'text-transparent bg-primary-foreground': !day.currentMonth }
      ]"
      :disabled="!day.isAvailable || !day.currentMonth"
    >
      <p>
        {{ day.date.getDate() }}
      </p>
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../ui/button/Button.vue'

const generateCalendar = () => {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const startDay = startOfMonth.getDay() // Get day of the week (0-6)
  const daysInMonth = endOfMonth.getDate() // Get total days in the current month

  const days = []

  // Add previous month's last days to the start if necessary
  for (let i = startDay; i > 0; i--) {
    const day = new Date(startOfMonth)
    day.setDate(day.getDate() - i)
    days.push({ date: day, currentMonth: false, isAvailable: day > today })
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(today.getFullYear(), today.getMonth(), i)
    days.push({ date: day, currentMonth: true, isAvailable: day > today })
  }

  // Add next month's first days to complete the last week if necessary
  const remainingDays = 42 - days.length // 42 to cover 6 weeks (6 * 7)
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(endOfMonth)
    day.setDate(day.getDate() + i)
    days.push({ date: day, currentMonth: false, isAvailable: day > today })
  }

  return days
}

const days = ref(generateCalendar())
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
</style>
