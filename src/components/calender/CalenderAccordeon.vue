<script setup>
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import axios from 'axios'
import { inject, ref } from 'vue'

const props = defineProps({
  accordionItems: {
    type: Array,
    required: true
  },
  date: String
})
const weather = ref(null)

async function getWeather(loc, time) {
  weather.value = null
  if (loc) {
    let dateTimeStr = `${props.date}T${time}Z`

    // Crear un objeto Date
    let dateObj = new Date(dateTimeStr)

    // Convertir el objeto Date a un timestamp UNIX
    let timestamp = Math.floor(dateObj.getTime() / 1000)
    let response
    if (import.meta.env.VITE_OPENWEATHERMAP_API_KEY_PAID) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${loc.lat}&lon=${
          loc.lon
        }&dt=${timestamp}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY_PAID}&lang=es`
      )
    } else {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${
          loc.lon
        }&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&lang=es`
      )
    }

    weather.value = {
      description: response.data.weather[0].description
    }
  }
}

const openEditFunction = inject('openEditFunction')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<template>
  <Accordion type="single" class="w-full" collapsible>
    <AccordionItem
      v-for="(item, index) in accordionItems"
      :key="item.title + index"
      :value="item.title + index"
    >
      <AccordionTrigger class="hover:no-underline" @click="getWeather(item?.location, item.time)">{{
        item.title
      }}</AccordionTrigger>
      <AccordionContent class="flex flex-col gap-4 items-center w-full">
        <div class="flex flex-row gap-4 items-center w-full">
          <Icon icon="mdi:calendar-clock" class="w-6 h-6" />
          <div class="flex flex-col">
            <p>{{ date }}</p>
            <p>{{ item.time }}</p>
          </div>
        </div>
        <div class="flex flex-row gap-4 items-center w-full">
          <Icon icon="mdi:map-marker" class="w-6 h-6" />
          <div class="flex flex-col">
            <p v-if="item.locationName">{{ item.locationName }}</p>
            <p v-if="weather" class="">
              {{ capitalizeFirstLetter(weather.description) }}
            </p>
            <p v-else>Sin información registrada</p>
          </div>
        </div>
        <div class="flex flex-row gap-4 items-center w-full">
          <Button class="w-full" @click="openEditFunction(index)">Editar</Button>
          <Button
            class="w-full hover:bg-destructive transition-colors hover:text-secondary dark:hover:text-primary"
            variant="outline"
            @click="$emit('deleteReminder', index)"
            >Eliminar</Button
          >
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
