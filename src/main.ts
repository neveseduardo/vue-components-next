import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import '@/assets/css/app.css';
import OTComponents from '@/components';

const app = createApp(App);

app.use(OTComponents);

app.mount('#app');
