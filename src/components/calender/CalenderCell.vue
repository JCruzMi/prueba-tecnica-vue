<template>
  <td v-bind="cellProps" :class="['py-0.5 relative px-0.5', isFocusVisible ? 'z-10' : 'z-0']">
    <div
      v-bind="mergedProps"
      ref="cellRef"
      v-show="!isOutsideMonth"
      class="size-14 outline-none group rounded-md"
    >
      <div
        :class="[
          'size-full rounded-md flex items-center justify-center',
          'text-gray-12 text-sm font-semibold',
          isDisabled
            ? isDateToday
              ? 'cursor-default'
              : 'text-gray-8 cursor-default'
            : 'cursor-pointer bg-gray-3',
          isFocusVisible && 'ring-1 group-focus:z-2 ring-gray-12 ring-offset-1',
          isSelected && 'bg-gray-12 text-gray-1',
          !isSelected && !isDisabled && 'hover:ring-2 hover:ring-gray-12'
        ]"
      >
        {{ formattedDate }}
        <div
          v-if="isDateToday"
          :class="[
            'absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-gray-12 rounded-full',
            isSelected && 'bg-gray-1'
          ]"
        />
      </div>
    </div>
  </td>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getLocalTimeZone, isSameMonth, isToday } from '@internationalized/date'
import { useCalendarCell } from '@react-aria/calendar'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'

const props = defineProps({
  state: {
    type: Object,
    required: true
  },
  date: {
    type: Object,
    required: true
  },
  currentMonth: {
    type: Object,
    required: true
  }
})

const cellRef = ref(null)

const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell(
  { date: props.date },
  props.state,
  cellRef
)

const isOutsideMonth = computed(() => !isSameMonth(props.currentMonth, props.date))
const isDateToday = computed(() => isToday(props.date, getLocalTimeZone()))

const { focusProps, isFocusVisible } = useFocusRing()

const mergedProps = computed(() => mergeProps(buttonProps, focusProps))
</script>

<style scoped>
/* Add your styles here */
</style>
