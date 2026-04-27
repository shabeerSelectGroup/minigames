import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    ,
    {
      path: '/sketch-the-future',
      name: 'sketch-the-future',
      component: () => import('../views/SketchTheFutureView.vue'),
    }
    
  ],
})

export default router
