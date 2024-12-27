import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Default from '../Default.vue'
import NotFound from '../components/NotFound.vue'
import PS_MK_List from '../PS_MK_List.vue'
import PS_MK_Mac from '../PS_MK_Mac.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/Default', component: Default },
    { path: '/App', component: App },
    { path: '/PS_MK_Mac', component: PS_MK_Mac },
    { path: '/PS_MK_List', component: PS_MK_List },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

export default router
