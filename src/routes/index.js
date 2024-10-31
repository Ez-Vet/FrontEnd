import { createRouter, createWebHistory } from "vue-router";
import loginComponent from "../iam/components/login.component.vue";
import registerComponent from "../iam/components/register.component.vue";
import sidebarLayout from "../public/pages/sidebarlayout.component.vue";
import profileDoctorComponent from "../profile/components/profile-doctor.component.vue";
import profileClientComponent from "../profile/components/profile-client.component.vue";
import appointmentsComponent from "../appointments/components/appointments.component.vue";
import inventoryComponent from "../inventory/components/inventory.component.vue";
import petListComponent from '../pets/components/pet-list.component.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: loginComponent },
    { path: '/register', component: registerComponent },
    {
        path: '/client', // Rutas bajo el contexto /client
        component: sidebarLayout,
        children: [
            { path: 'profile', component: profileClientComponent },
            { path: 'appointments', component: appointmentsComponent },
            { path: 'inventory', component: inventoryComponent },
            { path: 'pets', component: petListComponent } // Ruta específica para mascotas en client
        ]
    },
    {
        path: '/doctor', // Rutas bajo el contexto /doctor
        component: sidebarLayout,
        children: [
            { path: 'profile', component: profileDoctorComponent },
            { path: 'appointments', component: appointmentsComponent },
            { path: 'inventory', component: inventoryComponent }
            // Agrega más rutas específicas de doctor si es necesario
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
