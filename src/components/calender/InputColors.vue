<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const frameworks = [
  { value: 'bg-rojo', label: 'Rojo' },
  { value: 'bg-naranja', label: 'Naranja' },
  { value: 'bg-amarillo', label: 'Amarillo' },
  { value: 'bg-verde', label: 'Verde' },
  { value: 'bg-azul', label: 'Azul' },
  { value: 'bg-gris', label: 'Gris' }
]

const open = ref(false)
const value = ref(frameworks[4].value)

const emit = defineEmits(['color-selected'])
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        <div class="flex flex-row gap-4 items-center">
          <div class="w-6 h-6 rounded-full" :class="value"></div>
          {{
            value
              ? frameworks.find((framework) => framework.value === value)?.label
              : 'Selecciona un color'
          }}
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Buscar color" />
        <CommandEmpty>Color no encontrado.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    value = ev.detail.value
                  }
                  emit('color-selected', value)
                  open = false
                }
              "
            >
              <div class="flex flex-row gap-4 items-center">
                <div class="w-6 h-6 rounded-full" :class="framework.value"></div>
                {{ framework.label }}
              </div>
              <Check
                :class="
                  cn('ml-auto h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
