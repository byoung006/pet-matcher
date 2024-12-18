import { createRouter, createWebHistory } from 'vue-router'
import {userStore} from '../stores/userStore'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/user',
    name: 'UserComponent',
    component: () => import('../pages/User.vue'),
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/signup',
    name: 'CreateUser',
    component: () => import('../pages/CreateUser.vue'),
     meta: {
      requiresAuth:false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
     meta: {
      requiresAuth:false
    }
  },
  {
    path: '/my-matches',
    name: 'YourMatches',
    component: () => import('../pages/YourMatches.vue'),
     meta: {
      requiresAuth:true
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const store = userStore();
    console.log(store.isAuthenticated,  'do we have auth')
    if (!store.isAuthenticated === true) {
      next({ path: '/login' });
      return; // stop execution if user is not authenticated
    }
  }

  if (from.matched.some(record => (record.path === "login" || record.path === "signup"))) {
    next({ path: "/" });
    return; // stop execution if navigating from login
  }

  next(); // call next() only once
});

export default router
