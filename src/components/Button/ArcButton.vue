<script setup>
import { defineProps } from 'vue';
import IconLoading from '/@/assets/svg/loading.svg';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'default',
  },
});

const emit = defineEmits(['click']);

function onClick(e) {
  emit('click', e);
}
</script>

<template>
  <button
    class="transition hover:-translate-y-1 hover:scale-110 flex items-center justify-center rounded-md py-1.5 sm:py-2.5 px-2.5 sm:px-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:hover:bg-indigo-300"
    :class="{
      'bg-gray-500 hover:bg-gray-400': props.type === 'radio',
      'bg-indigo-500 hover:bg-indigo-400': props.type === 'default',
    }"
    :disabled="props.loading || props.disabled"
    @click="onClick">
    <IconLoading v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /><slot></slot>
  </button>
</template>
