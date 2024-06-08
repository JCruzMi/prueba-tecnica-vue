<template>
  <div class="flex flex-col gap-4">
    <CalenderHeader />
    <CalenderGrid />
  </div>
</template>

<script setup>
import CalenderGrid from './CalenderGrid.vue'
import CalenderHeader from './CalenderHeader.vue'
</script>
