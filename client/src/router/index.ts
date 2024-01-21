import { createRouter, createWebHistory } from 'vue-router'
import ModulTabel from "@/views/ModulTabel.vue";
import AccessIDSite from "@/views/AccessIDSite.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ModulTabel
        },
        {
            path: '/access/*',
            component: AccessIDSite
        },
    ]
})

export default router
