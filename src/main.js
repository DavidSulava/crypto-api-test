import { createApp } from 'vue/dist/vue.esm-bundler.js';
import './styles/main.less';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import {pinia} from "./stores/index.js";
import router from "./routes/index.js";
import {createVuetify} from "vuetify";

const vuetify = createVuetify({
    defaultTheme: 'dark',
    customProperties: true,
});

const app = createApp({
    router,
    pinia,
    components: {
        App,
    },
    template: '<App />',
});

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
