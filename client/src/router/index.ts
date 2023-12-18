import { createRouter, createWebHistory } from 'vue-router'
import ModulTabel from "@/views/ModulTabel.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ModulTabel
    }
  ]
})

export default router
