import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/assets/scripts/auth'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'}
      ]
    }
  }, {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'}
      ]
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/passreset',
    name: 'Passreset',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Passreset.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Messages.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Messages', link:'messages'}
      ]
    }
  },
  {
    path: '/help',
    name: 'Help',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Help', link:'help'}
      ]
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Settings', link:'settings'}
      ]
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Profile', link:'profile'}
      ]
    }
  },
  {
    path: '/progress',
    name: 'Progress',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Progress.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Progress', link:'progress'}
      ]
    }
  },
  {
    path: '/training/',
    name: 'Training',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Training.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Training', link:'training'}
      ]
    }
  },
  {
    path: '/trainingpage/:training',
    name: 'Trainingpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Trainingpage.vue'),
    meta:{
      requiresAuth: false,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Training', link:'trainingpage'}
      ]
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    meta:{
      requiresAdmin: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Admin', link:'admin'}
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!auth.isAuthenticated()){  
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresAdmin)){
    if(!auth.isAdmin()){
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})

export default router
