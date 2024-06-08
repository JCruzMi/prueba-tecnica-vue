<script setup lang="ts">
import { Button } from '@/components/ui/button'
import ReminderForm from './ReminderForm.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { provide, ref } from 'vue'

const open = ref(false)

const close = () => {
  open.value = false
}

provide('close', close)
</script>

<template>
  <Dialog :open="open">
    <Button @click="open = true" class="w-full"> Nuevo recordatorio </Button>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Agregar recordatorio </DialogTitle>
        <DialogDescription> Ingresa los datos del nuevo recordatorio. </DialogDescription>
      </DialogHeader>
      <ReminderForm />
      <DialogFooter>
        <DialogClose class="w-full">
          <Button class="w-full" variant="outline" @click="open = false"> Cerrar </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
