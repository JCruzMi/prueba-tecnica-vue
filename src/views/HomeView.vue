<script setup>
import Calender from '@/components/calender/CalenderComponente.vue'
import ThemeProvider from '@/components/layouts/ThemeProvider.vue'
</script>

<template>
  <main class="w-full flex min-h-[100dvh] p-4 flex-col gap-10">
    <section class="flex flex-row gap-4 w-full max-w-5xl mx-auto items-cent justify-center h-full">
      <ThemeProvider />
    </section>
    <section class="flex flex-row gap-4 w-full max-w-5xl mx-auto items-cent justify-center h-full">
      <Calender />
    </section>
  </main>
</template>
