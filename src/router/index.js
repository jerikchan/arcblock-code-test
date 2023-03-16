import { createRouter, createWebHistory } from 'vue-router';
import { appRoutes } from './routes';
import { NOT_FOUND_ROUTE } from './routes/base';

const router = createRouter({
  history: createWebHistory(window.blocklet ? window.blocklet.prefix : '/'),
  routes: [...appRoutes, NOT_FOUND_ROUTE],
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition;
  },
});

export default router;
