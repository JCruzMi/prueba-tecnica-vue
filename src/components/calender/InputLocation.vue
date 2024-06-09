<template>
  <div>
    <Input v-model="query" @input="fetchLocations" placeholder="Ingrese ciudad o país" />
    <ul v-if="locations.length" class="mt-2 gap-1 flex flex-col pr-3">
      <li v-for="location in locations" :key="location.id">
        <Button class="w-full justify-start" variant="outline" @click="selectLocation(location)">
          {{ location.name }}, {{ location.country }}
        </Button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import axios from 'axios'
import Button from '../ui/button/Button.vue'

const query = ref('')
const locations = ref([])
const emit = defineEmits(['location-selected'])

const fetchLocations = async () => {
  if (query.value.length < 3) {
    locations.value = []
    return
  }
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=2&appid=${
      import.meta.env.VITE_OPENWEATHERMAP_API_KEY
    }&lang=es`
  )
  locations.value = response.data.map((location) => ({
    name: location.name,
    country: location.country,
    lat: location.lat,
    lon: location.lon
  }))
}

const selectLocation = (location) => {
  emit('location-selected', location)
  query.value = `${location.name}, ${location.country}`
  locations.value = []
}
</script>
