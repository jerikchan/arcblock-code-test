<script setup>
import { defineProps, computed, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import IconCopy from '/@/assets/svg/copy.svg';

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  enable: {
    type: Boolean,
    default: false,
  },
});

const { copy, isSupported } = useClipboard();
const tips = ref(props.value);
const popoverVisible = ref(false);
const getEnable = computed(() => {
  return isSupported.value && props.enable && props.value;
});

async function onCopy() {
  if (getEnable.value) {
    try {
      await copy(props.value);
      showCopiedTips();
    } catch (error) {
      showCopiedTips(error.message);
    }
  }
}

let timeout = null;
function showPopover() {
  clearTimeout(timeout);
  tips.value = props.value;
  popoverVisible.value = true;
}
function hidePopover() {
  timeout = setTimeout(() => {
    popoverVisible.value = false;
  }, 300);
}
function showCopiedTips(msg = 'Copied') {
  clearTimeout(timeout);
  tips.value = msg;
  popoverVisible.value = true;
}
</script>
<template>
  <component
    :is="props.tag"
    @click="onCopy"
    @tap="onCopy"
    class="relative select-none"
    :class="{ 'cursor-pointer': getEnable }"
    @mouseenter="showPopover"
    @mouseleave="hidePopover">
    <slot></slot>
    <IconCopy class="ml-1.5" v-if="getEnable"></IconCopy>
    <div
      v-if="getEnable && popoverVisible"
      class="absolute px-4 py-2 bg-white -top-2 left-1/2 -translate-y-full -translate-x-1/2 border border-gray-200 rounded-lg">
      {{ tips }}
    </div>
  </component>
</template>
