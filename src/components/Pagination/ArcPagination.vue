<script setup>
import { defineProps, toRefs, computed, ref, watch } from 'vue';
import ArcInput from '/@/components/Input/ArcInput.vue';
import ArcButton from '../Button/ArcButton.vue';

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
    <ArcButton @click="onChange(pageRef - 1)" :disabled="page <= 1">Previous</ArcButton>
    <ArcInput
      type="number"
      class="w-20"
      :value="pageRef"
      :disabled="count <= 0"
      @input="onInput"
      @press-enter="onChange(pageRef)"></ArcInput>
    <span class="text-sm font-semibold text-gray-500">/ {{ count }}</span>
    <ArcButton @click="onChange(pageRef + 1)" :disabled="page >= count">Next</ArcButton>
  </nav>
</template>
