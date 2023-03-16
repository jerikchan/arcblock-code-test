export default {
  path: '/explorer/blocks/btc/:blockHash(.*)',
  name: 'BLOCK_EXPLORER',
  components: {
    default: () => import('/@/views/block-explorer/BlockExplorer.vue'),
  },
};
