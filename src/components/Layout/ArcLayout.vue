<script setup>
import IconLayoutLeft from '/@/assets/svg/layoutLeft.svg';
import IconLayoutRight from '/@/assets/svg/layoutRight.svg';
</script>
<template>
  <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
    <IconLayoutLeft
      class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"></IconLayoutLeft>
  </div>
  <slot></slot>
  <div
    class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
    <IconLayoutRight
      class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"></IconLayoutRight>
  </div>
</template>
