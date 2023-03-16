<script setup>
import { toRefs, defineProps } from 'vue';
import ArcClipboard from '../Clipboard/ArcClipboard.vue';
import DefaultFormatters from './formatters';

const props = defineProps({
  title: {
    type: String,
    default: 'Waiting...',
  },
  data: {
    type: Array,
    default: () => [],
  },
  defaultFormatType: {
    type: String,
    default: 'auto',
  },
  formatters: {
    type: Object,
    default: () => DefaultFormatters,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { title, data } = toRefs(props);

function format(item) {
  const formatter = props.formatters[item.formatType || props.defaultFormatType];
  return item.value && formatter ? formatter(item.value) : item.value;
}
</script>

<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 h-20 border-b border-gray-200">
      <div class="flex items-center h-full" :class="{ 'bg-slate-200 animate-pulse rounded': loading }">
        <template v-if="!loading">
          <slot name="title">
            <div class="text-3xl font-bold text-gray-900">{{ title }}</div>
          </slot>
        </template>
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-2">
      <dl
        class="px-4 sm:px-6 py-5 grid grid-cols-3 gap-4 bg-white even:bg-gray-100 [&:nth-child(4n-2)]:sm:bg-white [&:nth-child(4n)]:sm:bg-gray-100 [&:nth-child(4n-1)]:sm:bg-gray-100"
        v-for="item in data"
        :key="item.key">
        <dt class="text-sm font-medium text-gray-500 flex items-center grid-span-1">{{ item.label }}</dt>
        <ArcClipboard
          tag="dd"
          class="text-sm text-gray-900 flex items-center col-span-2"
          :enable="item.copyable"
          :value="item.value"
          :class="{ 'bg-slate-200 animate-pulse rounded': loading }">
          <template v-if="!loading">{{ format(item) }}</template>
        </ArcClipboard>
      </dl>
    </div>
  </div>
</template>
