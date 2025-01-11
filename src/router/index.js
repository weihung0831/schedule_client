import { createRouter, createWebHistory } from 'vue-router'
import PendingSchedule from '../components/PendingSchedule.vue'
import MachineSchedule from '../components/MachineSchedule.vue'
import TotalSchedule from '../components/TotalSchedule.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/PendingSchedule', component: PendingSchedule },
    { path: '/MachineSchedule', component: MachineSchedule },
    { path: '/TotalSchedule', component: TotalSchedule },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

export default router
