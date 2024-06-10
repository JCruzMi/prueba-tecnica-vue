<template>
  <DialogReminderList>
    <div
      :class="[
        'size-full relative px-0 pt-1 overflow-hidden rounded-lg hover:bg-secondary w-full h-28 transition-all flex flex-col items-start justify-start text-gray-12 text-sm font-semibold cursor-pointer bg-secondary hover:ring-2 hover:ring-secondary-foreground',
        { 'bg-secondary/50': !day.isAvailable },
        { 'bg-secondary/40 text-primary/50': !day.currentMonth }
      ]"
      @click="handleDayClick(day, day.date)"
    >
      <p class="text-center w-full">
        {{ day.date.getDate() }}
      </p>
      <ul class="flex flex-col gap-1 pb-1 px-1 relative w-full pt-1">
        <li
          v-for="(reminder, index) in reminderCount > 3 ? reminders.slice(0, 3) : reminders"
          :key="reminder.title + index"
          class="overflow-hidden"
        >
          <p
            class="font-bold rounded-sm text-xs p-1 flex gap-1 flex-col text-white relative w-full text-left whitespace-nowrap"
            :class="[reminder.color ?? 'bg-azul']"
            v-if="index < 2"
          >
            {{ reminder.title }}
          </p>
          <p
            class="font-bold rounded-sm text-xs p-1 flex gap-1 flex-col relative bg-white w-full text-black text-left whitespace-nowrap"
            v-else
          >
            {{ reminders.length - index }} más
          </p>
        </li>
      </ul>
    </div>
  </DialogReminderList>
</template>

<script setup>
import DialogReminderList from './DialogReminderList.vue'

defineProps({
  day: {
    type: Object,
    required: true
  },
  reminderCount: {
    type: Number
  },
  reminders: {
    type: Array
  }
})

const emit = defineEmits(['update:month'])

const handleDayClick = (day, date) => {
  // Format date to yyyy-mm-dd
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`
  emit('update:month', day, formattedDate)
}
</script>
