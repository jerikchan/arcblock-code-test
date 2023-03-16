<script setup>
import { defineProps, toRefs } from 'vue';
import ArcoButton from '/@/components/Button/ArcoButton.vue';
import IconUp from '/@/assets/svg/up.svg';
import IconDown from '/@/assets/svg/down.svg';
import DefaultSorters from './sorters';

const props = defineProps({
  sorters: {
    type: Array,
    default: () => DefaultSorters,
  },
  sort: {
    type: String,
    default: 'index',
  },
  order: {
    type: String,
    default: 'asc',
  },
});
const emit = defineEmits(['change']);

const { sorters, sort, order } = toRefs(props);

function onChange({ order, sort }) {
  emit('change', { order, sort });
}
</script>

<template>
  <div class="flex space-x-2">
    <ArcoButton
      v-for="item in sorters"
      :key="item.key"
      :type="item.sort === sort && item.order === order ? 'default' : 'radio'"
      @click="onChange(item)">
      <span v-if="item.icon" class="text-[0.5rem] mr-1"
        ><IconUp v-if="item.icon === 'up'" /><IconDown v-if="item.icon === 'down'" /></span
      ><span>{{ item.label }}</span>
    </ArcoButton>
  </div>
</template>
