import { createRouter, createWebHistory } from "vue-router";
import loginComponent from "../iam/components/login.component.vue";
import registerComponent from "../iam//components/register.component.vue"
import sidebarLayout from "../public/pages/sidebarlayout.component.vue"
import profileComponent from "../profile/components/profile.component.vue"
import appointmentsComponent from "../appointments/components/appointments.component.vue"
import inventoryCompoenent from "../inventory/components/inventory.component.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: loginComponent },
        { path: '/register', component: registerComponent },
        {
            path: '/', // Ruta principal para el layout
            component: sidebarLayout,
            children: [
                { path: 'profile', component: profileComponent },
                { path: 'inventory', component: inventoryCompoenent }, // 
                { path: 'appointments', component: appointmentsComponent }, // Ruta hija
                // Agrega más rutas hijas aquí si es necesario
            ]
        },
    ]
});

export default router;