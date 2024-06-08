<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import ReminderList from './ReminderList.vue'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Recordatorios </DialogTitle>
        <DialogDescription> Aqui puedes ver todos tus recordatorios. </DialogDescription>
      </DialogHeader>
      <ReminderList />
      <DialogFooter>
        <DialogClose class="w-full">
          <Button class="w-full" variant="outline"> Cerrar </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
