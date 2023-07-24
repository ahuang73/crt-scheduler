import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/shifts',
      name: 'shifts',
      component: () => import('../views/ShiftView.vue')
    },
    {
      path: '/shifts/new',
      name: 'newshift',
      component: () => import('../views/NewShiftView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/shift_types',
      name: 'shifttypes',
      component: () => import('../views/ShiftTypes.vue')
    },
    {
      path: '/responders',
      name: 'responders',
      component: () => import('../views/ResponderView.vue'),
      // children: [
      //   {path: '/new', component: import('../views/NewResponderView.vue')},
      // ],
    
    },

    {
      path: '/eot',
      name: 'endofterm',
      component: () => import('../views/EndOfTermView.vue')
    }
  ]
})

export default router
