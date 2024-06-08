<template>
  <div class="flex flex-col gap-4 p-4 rounded-lg bg-primary-foreground">
    <CalenderSelectedMonth :currentMonth="selectedMonth" @update:month="updateMonth" />
    <CalenderHeader />
    <CalenderGrid :selectedMonth="selectedMonth" @update:month="updateMonth" />
  </div>
</template>

<script setup>
import CalenderGrid from './CalenderGrid.vue'
import CalenderHeader from './CalenderHeader.vue'
import CalenderSelectedMonth from './CalenderSelectedMonth.vue'

import { provide, ref } from 'vue'
const selectedMonth = ref(new Date())

const updateMonth = (newMonth) => {
  selectedMonth.value = newMonth // Trigger reactivity to reload calendar
}

const reloadCalendar = () => {
  updateMonth(new Date(selectedMonth.value)) // Trigger reactivity to reload calendar
}

provide('reloadCalendar', reloadCalendar)
</script>
