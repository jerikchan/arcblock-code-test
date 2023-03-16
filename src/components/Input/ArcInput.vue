<script setup>
import { defineProps, ref, toRefs } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { value, placeholder } = toRefs(props);

const emit = defineEmits(['input', 'update:value', 'change', 'press-enter']);

const inputElement = ref(null);

function onChange() {
  emit('change', inputElement.value?.value);
}
function onPressEnter() {
  onChange();
  emit('press-enter', inputElement.value?.value);
}
function onInput() {
  emit('input', inputElement.value?.value);
  emit('update:value', inputElement.value?.value);
}
</script>

<template>
  <input
    type="text"
    ref="inputElement"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
    @blur="onChange"
    @keypress.enter="onPressEnter"
    :disabled="props.disabled"
    maxlength="200"
    class="outline-none rounded-md flex-auto border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
</template>
