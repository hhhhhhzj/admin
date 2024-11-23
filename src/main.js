import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "@tsparticles/vue3";
import { loadFull } from 'tsparticles'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(Particles, {
        init: async engine => {
            await loadFull(engine); 
        },
    })
    .mount('#app')
