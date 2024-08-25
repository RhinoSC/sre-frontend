import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SchedulesView from '../views/schedule/ScheduleView.vue'
import SchedulesEditView from '../views/schedule/ScheduleEditView.vue'
import SchedulesAddView from '../views/schedule/ScheduleAddView.vue'
import RunView from '../views/run/RunView.vue'
import RunEditView from '../views/run/RunEditView.vue'
import RunAddView from '../views/run/RunAddView.vue'
import PrizeView from '../views/prize/PrizeView.vue'
import PrizeEditView from '../views/prize/PrizeEditView.vue'
import PrizeAddView from '../views/prize/PrizeAddView.vue'
import BidView from '../views/bid/BidView.vue'
import BidEditView from '../views/bid/BidEditView.vue'
import BidAddView from '../views/bid/BidAddView.vue'
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: SchedulesView,
      meta: { requiresAuth: false }
    },
    {
      path: '/schedules/new',
      name: 'ScheduleAdd',
      component: SchedulesAddView,
      meta: { requiresAuth: false }
    },
    {
      path: '/schedules/edit/:id',
      name: 'ScheduleEdit',
      component: SchedulesEditView,
      meta: { requiresAuth: false }
    },
    {
      path: '/runs',
      name: 'Runs',
      component: RunView,
      meta: { requiresAuth: false }
    },
    {
      path: '/runs/new',
      name: 'RunAdd',
      component: RunAddView,
      meta: { requiresAuth: false }
    },
    {
      path: '/runs/edit/:id',
      name: 'RunEdit',
      component: RunEditView,
      meta: { requiresAuth: false }
    },
    {
      path: '/prizes',
      name: 'Prizes',
      component: PrizeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/prizes/new',
      name: 'PrizeAdd',
      component: PrizeAddView,
      meta: { requiresAuth: false }
    },
    {
      path: '/prizes/edit/:id',
      name: 'PrizeEdit',
      component: PrizeEditView,
      meta: { requiresAuth: false }
    },
    {
      path: '/bids',
      name: 'Bids',
      component: BidView,
      meta: { requiresAuth: false }
    },
    {
      path: '/bids/new',
      name: 'BidAdd',
      component: BidAddView,
      meta: { requiresAuth: false }
    },
    {
      path: '/bids/edit/:id',
      name: 'BidEdit',
      component: BidEditView,
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  console.log(isAuthenticated)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
