<template>
  <div class="grid-cols-7 w-full h-full grid gap-1 cursor-default">
    <CalenderDay
      v-for="day in days"
      :key="day.date"
      :day="day"
      @update:month="handleDayClick"
      :reminderCount="day.reminderCount"
      :reminders="day.reminders"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CalenderDay from './CalenderDay.vue'
import { useRoute, useRouter } from 'vue-router'
import { useRemindersStore } from '@/stores/counter'

const props = defineProps({
  selectedMonth: {
    type: Date,
    required: true
  }
})
const emit = defineEmits(['update:month'])
const router = useRouter()
const route = useRoute()

const handleDayClick = (day, date) => {
  router.push({
    path: route.path,
    query: {
      date: date
    }
  })
  if (!day.currentMonth) {
    const newMonth = new Date(day.date.getFullYear(), day.date.getMonth(), 1)
    emit('update:month', newMonth)
  }
}

const reminderStore = useRemindersStore()

const generateCalendar = (month) => {
  const today = new Date()
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)

  const startDay = startOfMonth.getDay() // Get day of the week (0-6)
  const daysInMonth = endOfMonth.getDate() // Get total days in the current month

  const days = []
  const reminderCounts = reminderStore.getRemindersCountForMonth(
    month.getFullYear(),
    month.getMonth()
  )

  const reminders = reminderStore.getRemindersForMonth(month.getFullYear(), month.getMonth())

  // Add previous month's last days to the start if necessary
  for (let i = startDay; i > 0; i--) {
    const day = new Date(startOfMonth)
    day.setDate(day.getDate() - i)
    const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(day.getDate()).padStart(2, '0')}`
    days.push({
      date: day,
      currentMonth: false,
      isAvailable: day > today,
      reminderCount: reminderCounts[formattedDate] || 0
    })
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(month.getFullYear(), month.getMonth(), i)
    const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(day.getDate()).padStart(2, '0')}`
    days.push({
      date: day,
      currentMonth: true,
      isAvailable: day > today,
      reminderCount: reminderCounts[formattedDate] || 0,
      reminders: reminders[formattedDate] || []
    })
  }

  // Add next month's first days to complete the last week if necessary
  const remainingDays = 42 - days.length // 42 to cover 6 weeks (6 * 7)
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(endOfMonth)
    day.setDate(day.getDate() + i)
    const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(day.getDate()).padStart(2, '0')}`
    days.push({
      date: day,
      currentMonth: false,
      isAvailable: day > today,
      reminderCount: reminderCounts[formattedDate] || 0,
      reminders: reminders[formattedDate] || []
    })
  }

  return days
}

const days = ref(generateCalendar(props.selectedMonth))

watch(
  () => props.selectedMonth,
  (newMonth) => {
    days.value = generateCalendar(newMonth)
  }
)
</script>
