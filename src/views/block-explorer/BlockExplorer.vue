<script setup>
import { watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { querySingleBlock } from '/@/api/explorer';
import ArcDescription from '/@/components/Description/ArcDescription.vue';
import ArcInputSearch from '/@/components/InputSearch/ArcInputSearch.vue';
import ArcList from '/@/components/List/ArcList.vue';

const router = useRouter();
const route = useRoute();

// 查询条件：排序方式、排序顺序、页码
const orderRef = ref(route.query.order || 'asc');
const sortRef = ref(route.query.sort || 'index');
const pageRef = ref(parseInt(route.query.page, 10) || 1);

// =====区块=====
const blockHashRef = ref('');
// 请求区块数据
const { data, execute, error, isLoading } = querySingleBlock();
const sortLoading = ref(false);
// 排序好的数据
const sortDataRef = ref({});
watch(
  [data, orderRef, sortRef],
  (data, order, sort) => {
    sortDataRef.value = computeSortData(data, order, sort);
  },
  { immediate: true }
);
// 最终使用的区块数据
const getData = computed(() => {
  return !isLoading.value && !error.value && route.params.blockHash && data.value ? data.value : null;
});
const getLoading = computed(() => {
  return sortLoading.value || isLoading.value;
});

async function computeSortData(data, order, sort) {
  if (data && data.length) {
    sortLoading.value = true;
    // TODO: 排序数据
    return await new Promise((resolve) =>
      setTimeout(() => {
        sortLoading.value = false;
        resolve(data, order, sort);
      }, 1000)
    );
  }
}

// =====数据摘要表=====
const getTitle = computed(() => {
  return error.value ? 'Invalid Chain or Block ID' : `Bitcoin Block ${getData.value?.block_index ?? ''}`;
});

// 匹配字段
const schemas = [
  // General info
  { label: 'Hash', key: 'hash', formatType: 'hash', copyable: true },
  { label: 'Mined On', key: 'time', formatType: 'timeOfSecond' },
  { label: 'Transaction count', key: 'n_tx' },
  { label: 'Fee total', key: 'fee', formatType: 'BTC' },
  // Technical details
  { label: 'Size', key: 'size' },
  { label: 'Height', key: 'height' },
  { label: 'Wight', key: 'weight' },
  { label: 'Merkle root', key: 'mrkl_root', formatType: 'hash', copyable: true },
  { label: 'Nonce', key: 'nonce' },
  { label: 'Bits', key: 'bits' },
];

// 匹配数据摘要
const descData = computed(() => {
  return schemas.map((schema) => {
    return {
      value: getData.value?.[schema.key] ?? '',
      ...schema,
    };
  });
});

// =====交易数据=====
const transactions = computed(() => {
  return getData.value?.tx || [];
});

// =====分页=====
const paginationProps = computed(() => {
  return { page: pageRef.value, total: transactions.value.length };
});

function onPageChange(page) {
  pageRef.value = page;
}

// =====排序=====
const sorterProps = computed(() => {
  return { sort: sortRef.value, order: orderRef.value };
});

function onSortChange({ order, sort }) {
  orderRef.value = order;
  sortRef.value = sort;
}

// =====vars effect======
watch(blockHashRef, (blockHash) => {
  router.push(`/explorer/blocks/btc/${blockHash}`);
});

watch([sortRef, orderRef], () => {
  router.push({ query: { ...route.query, sort: sortRef.value, order: orderRef.value } });
});

watch(pageRef, () => {
  router.push({ query: { ...route.query, page: pageRef.value } });
});

// ======urls effect======
watch(
  () => route.params.blockHash,
  (blockHash) => {
    if (blockHash) {
      execute({ params: blockHash });
    }
  },
  { immediate: true }
);

watch(
  () => [route.query.sort, route.query.order],
  () => {
    sortRef.value = route.query.sort;
    orderRef.value = route.query.order;
  }
);

watch(
  () => route.query.page,
  (page) => {
    pageRef.value = parseInt(page, 10) || 1;
  }
);
</script>

<template>
  <div class="mx-auto p-4 sm:p-10 max-w-5xl space-y-10">
    <div class="relative space-y-5">
      <ArcInputSearch
        class="sticky top-2 z-20"
        v-model:value="blockHashRef"
        :loading="getLoading"
        placeholder="Search for transactions, addresses, blocks and embedded text data..." />
      <ArcDescription :data="descData" :loading="getLoading">
        <template #title>
          <h3 class="text-xl sm:text-3xl font-bold text-gray-900">{{ getTitle }}</h3>
        </template>
      </ArcDescription>
    </div>
    <div class="relative space-y-5">
      <h3 class="text-xl sm:text-3xl font-bold text-gray-900">Transactions</h3>
      <ArcList
        :loading="getLoading"
        :data="transactions"
        :paginationProps="paginationProps"
        :sorterProps="sorterProps"
        @page-change="onPageChange"
        @sort-change="onSortChange" />
    </div>
  </div>
</template>
