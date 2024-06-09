<template>
  <div class="flex flex-row gap-4 w-full justify-start items-center">
    <Button @click="previousMonth" variant="outline" class="px-2">
      <Icon icon="mdi:chevron-left" class="w-6 h-6" />
    </Button>
    <Button @click="nextMonth" variant="outline" class="px-2">
      <Icon icon="mdi:chevron-right" class="w-6 h-6" />
    </Button>
    <span class="text-xl">{{ formattedMonth }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Button from '../ui/button/Button.vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  currentMonth: {
    type: Date,
    required: true
  }
})

const emit = defineEmits(['update:month'])

const month = ref(new Date(props.currentMonth))

const formattedMonth = computed(() => {
  return month.value.toLocaleString('default', { month: 'long', year: 'numeric' })
})

const updateMonth = () => {
  emit('update:month', new Date(month.value))
}

const previousMonth = () => {
  month.value.setMonth(month.value.getMonth() - 1)
  updateMonth()
}

const nextMonth = () => {
  month.value.setMonth(month.value.getMonth() + 1)
  updateMonth()
}

watch(
  () => props.currentMonth,
  (newMonth) => {
    month.value = new Date(newMonth)
  }
)
</script>

<style scoped></style>
