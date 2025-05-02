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
      path: '/patient',
      name: 'patient',
      component: () => import('../views/DetailsRecipientView.vue'),
      props: true, // ทำให้รับ id เป็น prop ใน Vue component
    },
  ],
})

export default router
9
