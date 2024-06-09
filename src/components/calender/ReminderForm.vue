<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="date" class="form-label">Color</label>
      <InputColors @color-selected="setColor" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="title" class="form-label" max-length="30" min-length="5">Título</label>
      <Input id="title" v-model="title" class="form-input" required autocomplete="off" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="time" class="form-label">Hora</label>
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
      <label for="location" class="form-label">Ubicación</label>
      <InputLocation @location-selected="setLocation" />
    </div>
    <Button type="submit" :disabled="!formCompleted"> Agregar recordatorio </Button>
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRemindersStore } from '../../stores/reminders'
import { Input } from '@/components/ui/input'
import Button from '../ui/button/Button.vue'
import { useRoute } from 'vue-router'
import InputLocation from './InputLocation.vue'
import InputColors from './InputColors.vue'

const reminderStore = useRemindersStore()
const close = inject('close')

const title = ref('')
const time = ref('')
const location = ref('')
const locationName = ref('')
const color = ref('')

const formCompleted = computed(() => {
  return title.value && time.value
})

const route = useRoute()

const submitForm = () => {
  reminderStore.addReminder(route.query.date, {
    title: title.value,
    time: time.value,
    location: location.value,
    locationName: locationName.value,
    color: color.value != '' ? color.value : 'bg-azul'
  })
  close()
  title.value = ''
  time.value = ''
  location.value = ''
  locationName.value = ''
  color.value = ''
}

const setLocation = async (loc) => {
  location.value = { lat: loc.lat, lon: loc.lon }
  locationName.value = `${loc.name}, ${loc.country}`
}

const setColor = (col) => {
  color.value = col
}
</script>
