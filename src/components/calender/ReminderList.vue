<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row w-full justify-between gap-4 items-center">
      <Button variant="outline" class="w-full" disabled>{{ route.query.date }}</Button>
      <DialogReminderForm />
    </div>

    <ScrollArea class="max-h-[50dvh] h-full pr-3" v-if="reminders.length">
      <CalenderAccordeon
        :accordionItems="reminders"
        :date="route.query.date"
        @deleteReminder="deleteReminder"
      >
      </CalenderAccordeon>
    </ScrollArea>

    <p v-else>Aún no hay recordatorios</p>
  </div>
</template>

<script setup>
import { computed, inject, onUnmounted } from 'vue'
import { useRemindersStore } from '@/stores/reminders'
import DialogReminderForm from './DialogReminderForm.vue'
import CalenderAccordeon from './CalenderAccordeon.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRoute, useRouter } from 'vue-router'
import Button from '../ui/button/Button.vue'
const route = useRoute()
const router = useRouter()
const reloadCalendar = inject('reloadCalendar')

const store = useRemindersStore()
const reminders = computed(() => store.getReminders(route.query.date))

const deleteReminder = (index) => {
  store.deleteReminder(route.query.date, index)
}

onUnmounted(() => {
  router.push(route.path)
  reloadCalendar()
})
</script>

<style scoped></style>
