<template>
  <DialogReminderList>
    <Button
      :class="[
        'size-full relative hover:bg-secondary w-14 h-14 transition-all flex items-center justify-center text-gray-12 text-sm font-semibold cursor-pointer bg-secondary hover:ring-2 hover:ring-secondary-foreground',
        { 'bg-secondary/50': !day.isAvailable },
        { 'bg-primary-foreground text-primary/50': !day.currentMonth }
      ]"
      @click="handleDayClick(day, day.date)"
    >
      <p>
        {{ day.date.getDate() }}
      </p>
      <p
        v-if="reminderCount != 0"
        class="absolute text-[10px] top-0 right-0 bg-popover text-primary rounded-sm w-4 h-4 flex items-center justify-center"
      >
        {{ reminderCount }}
      </p>
    </Button>
  </DialogReminderList>
</template>

<script setup>
import DialogReminderList from './DialogReminderList.vue'
import { Button } from '@/components/ui/button'

defineProps({
  day: {
    type: Object,
    required: true
  },
  reminderCount: {
    type: Number
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
