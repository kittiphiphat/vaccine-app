import { createRouter, createWebHistory } from 'vue-router'
import VaccineTable from '../components/VaccineTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VaccineTable,
    },
    {
      path: '/vaccine/:id',
      name: 'vaccineDetail',
      component: () => import('../views/VaccineDetailView.vue') // ชี้ไปที่หน้าใหม่
    }
  ],
})

export default router
9
