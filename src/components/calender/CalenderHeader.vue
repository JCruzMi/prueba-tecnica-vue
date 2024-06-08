<template>
  <div class="grid grid-cols-7 gap-1">
    <p class="col-span-1 text-primary" v-for="day in days" :key="day">{{ day }}</p>
  </div>
</template>

<script setup>
const days = ['Dom', 'Lun', 'Mar', 'MIE', 'JUE', 'VIE', 'SAB']
</script>
