<script setup>
import { defineProps, ref } from 'vue';
import ArcInput from '/@/components/Input/ArcInput.vue';
import ArcButton from '../Button/ArcButton.vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  searchText: {
    type: String,
    default: 'Search',
  },
});

const emit = defineEmits(['update:value']);

const valueRef = ref(props.value);

function onSearch() {
  emit('update:value', valueRef.value);
}
</script>

<template>
  <div class="flex space-x-4">
    <ArcInput
      class="flex-shrink w-full"
      :placeholder="props.placeholder"
      v-model:value="valueRef"
      @press-enter="onSearch"
      type="search"
      :disabled="loading" />
    <ArcButton class="flex-none" :loading="loading" @click="onSearch">
      {{ props.searchText }}
    </ArcButton>
  </div>
</template>
