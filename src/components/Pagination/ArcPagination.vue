<script setup>
import { defineProps, toRefs, computed, ref, watch } from 'vue';
import ArcoInput from '/@/components/Input/ArcoInput.vue';
import ArcoButton from '/@/components/Button/ArcoButton.vue';

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 15,
  },
});

const emit = defineEmits(['change']);

const { page, total, pageSize } = toRefs(props);

const pageRef = ref(page.value);
watch(page, (page) => {
  pageRef.value = parsePage(page);
});

const count = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

function onChange(page) {
  page = parsePage(page);
  if (page > 0 && page <= count.value) {
    emit('change', page);
  }
}

function onInput(page) {
  pageRef.value = parsePage(page);
}

function parsePage(page) {
  return parseInt(page, 10) || 1;
}
</script>

<template>
  <nav class="inline-flex space-x-4 rounded-md items-center">
    <ArcoButton @click="onChange(pageRef - 1)" :disabled="page <= 1">Previous</ArcoButton>
    <ArcoInput
      type="number"
      class="w-20"
      :value="pageRef"
      :disabled="count <= 0"
      @input="onInput"
      @press-enter="onChange(pageRef)"></ArcoInput>
    <span class="text-sm font-semibold text-gray-500">/ {{ count }}</span>
    <ArcoButton @click="onChange(pageRef + 1)" :disabled="page >= count">Next</ArcoButton>
  </nav>
</template>
