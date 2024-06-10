<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="date" class="form-label">Color</label>
      <InputColors @color-selected="setColor" :colorDefault="color" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="title" class="form-label" max-length="30" min-length="5">Título</label>
      <Input
        id="title"
        v-model="title"
        class="form-input"
        required
        autocomplete="off"
        placeholder="Título"
      />
    </div>
    <div>
      <label for="description" class="form-label">Día</label>
      <Input id="day" type="date" v-model="date" class="form-input" required autocomplete="off" />
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
      <InputLocation @location-selected="setLocation" :locationDefault="locationName" />
    </div>
    <Button type="submit" :disabled="!formCompleted">
      {{ editIndex ? 'Actualizar' : 'Agregar recordatorio' }}
    </Button>
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRemindersStore } from '@/stores/counter'
import { Input } from '@/components/ui/input'
import Button from '../ui/button/Button.vue'
import { useRoute } from 'vue-router'
import InputLocation from './InputLocation.vue'
import InputColors from './InputColors.vue'

const route = useRoute()

const reminderStore = useRemindersStore()
const close = inject('close')
const editIndex = inject('editIndex')

const title = ref('')
const time = ref('')
const location = ref('')
const locationName = ref('')
const color = ref('bg-azul')
const date = ref(route.query.date)

const formCompleted = computed(() => {
  return title.value && time.value
})

const submitForm = () => {
  reminderStore.addReminder(date.value, {
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

const submitEditForm = () => {
  reminderStore.editReminder(
    route.query.date,
    date.value,
    {
      title: title.value,
      time: time.value,
      location: location.value,
      locationName: locationName.value,
      color: color.value != '' ? color.value : 'bg-azul'
    },
    editIndex.value
  )
  close()
}

const onSubmit = () => {
  if (editIndex.value) {
    submitEditForm()
  } else {
    submitForm()
  }
}

const setLocation = async (loc) => {
  location.value = { lat: loc.lat, lon: loc.lon }
  locationName.value = `${loc.name}, ${loc.country}`
}

const setColor = (col) => {
  color.value = col
}

if (editIndex.value) {
  const reminder = reminderStore.getReminder(date.value, editIndex.value)
  title.value = reminder.title
  time.value = reminder.time
  location.value = reminder.location
  locationName.value = reminder.locationName
  color.value = reminder.color
}
</script>
