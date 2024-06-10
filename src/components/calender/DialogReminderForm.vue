<script setup>
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
import { inject, provide, ref } from 'vue'

const open = ref(false)
const openEdit = inject('openEdit')
const closeEditFunction = inject('closeEditFunction')

const close = () => {
  open.value = false
  closeEditFunction()
}

provide('close', close)
provide('editIndex', openEdit)
</script>

<template>
  <Dialog :open="open || openEdit != ''">
    <Button @click="open = true" class="w-full"> Nuevo recordatorio </Button>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {{ openEdit != '' ? 'Editar recordatorio' : 'Nuevo recordatorio' }}
        </DialogTitle>
        <DialogDescription>
          {{ openEdit != '' ? 'Edita el recordatorio.' : 'Crea un nuevo recordatorio.' }}
        </DialogDescription>
      </DialogHeader>
      <ReminderForm />
      <DialogFooter>
        <DialogClose class="w-full">
          <Button class="w-full" variant="outline" @click="close">
            {{ openEdit != '' ? 'Cancelar' : 'Cerrar' }}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
