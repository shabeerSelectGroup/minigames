import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/urban/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/task3',
      name: 'task3',
      component: () => import('../views/Task3view.vue'),
    },
    {
      path: '/task7',
      name: 'task7',
      component: () => import('../views/Task7view.vue'),
    }
    
  ],
})

export default router
