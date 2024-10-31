import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import i18n from "./i18n.js";
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Toolbar from "primevue/toolbar";
import Image from "primevue/image";
import ToggleButton from 'primevue/togglebutton';
import 'primeicons/primeicons.css';
import router from './routes/index.js';
import Popover from 'primevue/popover';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';


const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});
/* app.use(PrimeVue, { unstyled: true }); */

app.component("pv-toolbar", Toolbar);
app.component("pv-image", Image);
app.component("pv-inputtext", InputText);
app.component("pv-button", Button);
app.component("pv-togglebutton", ToggleButton);
app.component("pv-popover", Popover);
app.component("pv-divider", Divider);
app.component("pv-card", Card);
app.component("pv-dialog", Dialog);

app.mount('#app');