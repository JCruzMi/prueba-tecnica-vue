<template>
  <div class="grid grid-cols-7 gap-2">
    <p
      class="col-span-1 size-full relative w-full h-auto p-2 rounded-sm transition-all flex items-center justify-center text-gray-12 text-sm font-semibold cursor-default bg-transparent"
      v-for="day in days"
      :key="day"
    >
      {{ day }}
    </p>
  </div>
</template>

<script setup>
const days = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']
</script>
