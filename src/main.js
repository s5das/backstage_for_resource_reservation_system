import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/models/router/router'
import 'default-passive-events'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App).use(pinia).use(router);

app.mount('#app')
