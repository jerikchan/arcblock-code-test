export const NOT_FOUND_ROUTE = {
  path: '/:pathMatch(.*)*',
  name: 'NOT_FOUND',
  components: {
    default: () => import('/@/views/not-found/NotFound.vue'),
  },
};
