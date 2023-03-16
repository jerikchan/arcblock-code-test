<script setup>
import { defineProps, toRefs, computed, watch, ref } from 'vue';

import { dayjs } from '/@/utils/dayjs';
import ArcPagination from '/@/components/Pagination/ArcPagination.vue';
import ArcButton from '../Button/ArcButton.vue';

import IconCoinbase from '/@/assets/svg/coinbase.svg';
import IconCollapse from '/@/assets/svg/collapse.svg';
import IconUnCollapse from '/@/assets/svg/unCollapse.svg';
import IconArrowUp from '/@/assets/svg/arrowUp.svg';
import IconLoading from '/@/assets/svg/loading.svg';

import ArcListSorter from './ArcListSorter.vue';

const DefaultPaginationProps = {
  page: 1,
  total: 0,
  pageSize: 15,
};

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  sorterProps: {
    type: Object,
    default: () => ({
      sort: 'index',
      order: 'asc',
    }),
  },
  paginationProps: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['sort-change', 'page-change']);

const { data, sorterProps } = toRefs(props);

const allCollapse = ref(false);
const getPaginationProps = computed(() => {
  return {
    ...DefaultPaginationProps,
    ...props.paginationProps,
  };
});

const renderData = ref([]);
watch([data, getPaginationProps], () => {
  renderData.value = [];

  const start = (getPaginationProps.value.page - 1) * getPaginationProps.value.pageSize;
  const end = start + getPaginationProps.value.pageSize;
  for (let i = start; i < end; i++) {
    if (data.value[i]) {
      renderData.value.push({
        item: data.value[i],
        opts: {
          expand: allCollapse.value,
          index: i,
        },
      });
    }
  }
});

function onSortChange({ order, sort }) {
  emit('sort-change', { order, sort });
}

function onPageChange(page) {
  emit('page-change', page);
}

function onToggle() {
  allCollapse.value = !allCollapse.value;
  renderData.value.forEach(({ opts }) => (opts.expand = allCollapse.value));
}
</script>

<template>
  <div class="relative text-right pb-12">
    <div class="flex space-x-2 mb-4 text-left pt-2 overflow-x-auto">
      <ArcButton @click="onToggle" class="min-h-[2rem]"
        ><IconCollapse v-if="!allCollapse" /><IconUnCollapse v-else
      /></ArcButton>
      <ArcListSorter v-bind="sorterProps" @change="onSortChange" />
    </div>
    <div class="sm:rounded-lg shadow overflow-hidden text-sm font-medium text-gray-500 relativez-10 mb-4 text-left">
      <div v-if="!renderData.length" class="h-60 flex justify-center items-center text-gray-500 font-bold text-2xl">
        Empty
      </div>
      <div
        v-else
        v-for="{ item, opts } in renderData"
        :key="item.key"
        class="hover:bg-gray-50 bg-white border-t first:border-t-0 border-gray-150">
        <div class="sm:grid sm:grid-cols-3 sm:gap-2 px-4 pb-5" @click="opts.expand = !opts.expand">
          <div class="flex pt-5 justify-end sm:justify-start">
            <div class="flex items-center justify-start space-x-4">
              <div
                class="flex-none border border-gray-150 w-10 h-10 flex items-center justify-center font-bold text-black rounded-full">
                <span v-if="item.fee === 0"><IconCoinbase></IconCoinbase></span>
                <span v-else>TX</span>
              </div>
              <div>
                <div class="space-x-2">
                  <span class="text-black">{{ opts.index }}</span>
                  <span>ID: </span>
                  <span class="text-orange-400">{{ item.hash.slice(0, 4) }}-{{ item.hash.slice(-4) }}</span>
                </div>
                <div>{{ dayjs.utc(item.time * 1000).format('MM/DD/YYYY, HH:mm:ss') }}</div>
              </div>
            </div>
          </div>
          <div class="flex pt-5 items-center justify-center hidden sm:block">
            <div class="flex flex-col items-center justify-center">
              <div class="space-x-2">
                <span class="text-black">From</span>
                <span v-if="item.fee === 0">Block Reward</span>
                <span v-else-if="item.inputs.length >= 1" class="text-orange-400">
                  {{ item.inputs[0].prev_out.addr?.slice(0, 4) }}-{{ item.inputs[0].prev_out.addr?.slice(-4) }}</span
                >
                <span v-else>{{ item.inputs.length }} Inputs</span>
              </div>
              <div class="space-x-2">
                <span class="text-black">To</span>
                <span v-if="item.out.length === 1">
                  {{ item.out[0].addr?.slice(0, 4) }}-{{ item.out[0].addr?.slice(-4) }}</span
                >
                <span v-else>{{ item.out.length }} Outputs</span>
              </div>
            </div>
          </div>
          <div class="flex space-x-4 pt-5 items-center justify-end">
            <div class="flex flex-col items-end">
              <div class="space-x-2">
                <span class="text-black">0.9876</span>
                <span>BTC</span>
              </div>
              <div class="space-x-2">
                <span class="text-red-700">Fee</span>
                <span>{{ item.fee }} Stats</span>
              </div>
            </div>
            <div class="transition-transform ease-in cursor-pointer" :class="{ 'rotate-180': opts.expand }">
              <IconArrowUp />
            </div>
          </div>
        </div>
        <div class="min-h-[8rem] border-t border-gray-150 sm:grid sm:grid-cols-2" v-show="opts.expand">
          <div class="border-r border-gray-150 p-4">
            <div class="font-bold text-black">From</div>
            <div class="space-y-4">
              <div v-for="input in item.inputs" :key="input.index" class="flex space-x-6 pl-6">
                <div class="font-bold text-black">{{ input.index + 1 }}</div>
                <div class="overflow-hidden">
                  <div class="text-orange-400 break-all">{{ input.prev_out.addr }}</div>
                  <div>0.9876 BTC</div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="font-bold text-black">To</div>
            <div class="space-y-4">
              <div v-for="out in item.out" :key="out.index" class="flex space-x-6 pl-6">
                <div class="font-bold text-black">{{ out.n + 1 }}</div>
                <div class="overflow-hidden">
                  <div class="text-orange-400 break-all">{{ out.addr || 'UnKnown' }}</div>
                  <div>0.9876 BTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="absolute inset-0 z-30 flex justify-center text-left">
      <div class="absolute inset-0 bg-gray-50 opacity-50 bg-white z-10"></div>
      <IconLoading class="w-16 h-16 mt-20 sticky top-20 animate-spin text-black z-20" />
    </div>
    <div class="sticky bottom-2 z-20 inline-flex justify-end px-2 bg-gray-50 shadow rounded-lg pb-2 pt-2">
      <ArcPagination v-bind="getPaginationProps" @change="onPageChange"></ArcPagination>
    </div>
  </div>
</template>
