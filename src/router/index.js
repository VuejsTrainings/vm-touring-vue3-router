import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
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
      name: 'event-layout',
      component: EventLayoutView,
      props: true, 
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetailView,
           
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
          props: true, 
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true, 
        },
      ]
    },
    {
      path: '/about-us',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView
    },
    {
      path: '/about',
      // Redirection (peut être nécessaire pour ne pas rompre des liens externes existants vers nos pages)
      redirect: {name: 'about'},
    },

  ]
})

export default router
