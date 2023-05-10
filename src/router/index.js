import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView, 
      props: (route) => {
        return {
          page: parseInt(route.query.page) || 1
        }
      }
    },
    {
      path: '/events/:id',
      name: 'event-details',
      component: EventDetailView,
      props: true, 
    },
    {
      path: '/events/:id/register',
      name: 'event-register',
      component: EventRegisterView,
      props: true, 
    },
    {
      path: '/events/:id/edit',
      name: 'event-edit',
      component: EventEditView,
      props: true, 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView
    }
  ]
})

export default router
