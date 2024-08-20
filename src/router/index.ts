import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SchedulesView from '../views/schedule/ScheduleView.vue'
import SchedulesEditView from '../views/schedule/ScheduleEditView.vue'
import SchedulesAddView from '../views/schedule/ScheduleAddView.vue'
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
    }
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
