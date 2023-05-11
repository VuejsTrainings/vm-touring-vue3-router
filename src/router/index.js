import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFound from '@/views/NotFoundView.vue'
import NetworkError from '@/views/NetworkErrorView.vue'
import AboutView from '@/views/AboutView.vue'

import NProgress from 'nprogress';

import EventsService from '@/services/EventsService.js';
import GStore from '@/stores/index';

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
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true, 
      beforeEnter: to => {
        return EventsService
          .getEvent( to.params.id )
          .then (res => {
            GStore.event = res.data
          })
          .catch( err => {
              console.log(err)
              if(err.reponse && err.response.status == 404){
                  return ({ name: '404-resource', params: { resource: 'event' }});
              } else  {
                  return ({ name: 'network-error' });
              }
          });
      },
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
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/events/:suiteChemin(.*)',
      redirect: to => ({ path: 'event/' + to.params.suiteChemin }),
    },
    {
      path: '/about-us',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView,
      // Aliasing, mais pais idéal pour le SEO (contenu duppliqué à 2 adresses)
      alias:'/about'
    },
    {
      path: "/:catchOtherRoutes(.*)",
      component: NotFound,
      props: route => ({ resource: `/${route.params.catchOtherRoutes} page` })
    },
    {
      path: "/404/:resource",
      name:'404-resource',
      component: NotFound,
      props: true
    },
    {
      path: "/networkError",
      name:'network-error',
      component: NetworkError
    },
  ]
})

router.beforeEach( (to,from) => {
  NProgress.start();

  const isAuthorized = false;
  if ( to.meta.requiresAuth && !isAuthorized ){
    GStore.flashMessage = "You're not authorized for this operation!"
    setTimeout(() => {
      GStore.flashMessage = ''
    },3000);
    if(from.href)
      return false;
    else
      return {name: 'event-list'}
  }
})
router.afterEach( () => {
  NProgress.done();
})

export default router
