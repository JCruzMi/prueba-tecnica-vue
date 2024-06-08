<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="title" class="form-label" max-length="30" min-length="5">Título:</label>
      <Input id="title" v-model="title" class="form-input" required autocomplete="off" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="time" class="form-label">Hora:</label>
      <Input
        id="time"
        type="time"
        v-model="time"
        max-length="30"
        min-length="5"
        class="form-input"
        required
        autocomplete="off"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="place" class="form-label">Lugar:</label>
      <Input
        id="place"
        v-model="place"
        class="form-input"
        max-length="30"
        min-length="5"
        required
        autocomplete="off"
      />
    </div>
    <Button type="submit" :disabled="!formCompleted"> Agregar recordatorio </Button>
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRemindersStore } from '@/stores/reminders'
import { Input } from '@/components/ui/input'
import Button from '../ui/button/Button.vue'
import { useRoute } from 'vue-router'

const reminderStore = useRemindersStore()
const close = inject('close')

const title = ref('')
const time = ref('')
const place = ref('')

const formCompleted = computed(() => {
  return title.value && time.value && place.value
})

const route = useRoute()

const submitForm = () => {
  reminderStore.addReminder(route.query.date, {
    title: title.value,
    time: time.value,
    place: place.value
  })
  close()
  title.value = ''
  time.value = ''
  place.value = ''
}
</script>
