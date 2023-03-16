import './design/tailwind.css';
import './design/public.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.errorHandler = (error) => {
  console.error(error);
};
app.use(router);
app.mount('#app');
