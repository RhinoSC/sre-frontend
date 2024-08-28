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
import DonationView from '../views/donation/DonationView.vue'
import DonationEditView from '../views/donation/DonationEditView.vue'
import DonationAddView from '../views/donation/DonationAddView.vue'
import UserView from '../views/user/UserView.vue'
import UserEditView from '../views/user/UserEditView.vue'
import UserAddView from '../views/user/UserAddView.vue'
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
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
      meta: { requiresAuth: true }
    },
    {
      path: '/schedules/new',
      name: 'ScheduleAdd',
      component: SchedulesAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/schedules/edit/:id',
      name: 'ScheduleEdit',
      component: SchedulesEditView,
      meta: { requiresAuth: true }
    },
    {
      path: '/runs',
      name: 'Runs',
      component: RunView,
      meta: { requiresAuth: true }
    },
    {
      path: '/runs/new',
      name: 'RunAdd',
      component: RunAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/runs/edit/:id',
      name: 'RunEdit',
      component: RunEditView,
      meta: { requiresAuth: true }
    },
    {
      path: '/prizes',
      name: 'Prizes',
      component: PrizeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/prizes/new',
      name: 'PrizeAdd',
      component: PrizeAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/prizes/edit/:id',
      name: 'PrizeEdit',
      component: PrizeEditView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bids',
      name: 'Bids',
      component: BidView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bids/new',
      name: 'BidAdd',
      component: BidAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bids/edit/:id',
      name: 'BidEdit',
      component: BidEditView,
      meta: { requiresAuth: true }
    },
    {
      path: '/donations',
      name: 'Donations',
      component: DonationView,
      meta: { requiresAuth: true }
    },
    {
      path: '/donations/new',
      name: 'DonationAdd',
      component: DonationAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/donations/edit/:id',
      name: 'DonationEdit',
      component: DonationEditView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'Users',
      component: UserView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/new',
      name: 'UserAdd',
      component: UserAddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/edit/:id',
      name: 'UserEdit',
      component: UserEditView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  // console.log(isAuthenticated)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
