import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/auth'
import Home from '../views/Home.vue'

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/berichten',
    name: 'Berichten',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Berichten.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Berichten', link:'berichten'}
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
    path: '/instellingen',
    name: 'Instellingen',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Instellingen.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Instellingen', link:'instellingen'}
      ]
    }
  },
  {
    path: '/profiel',
    name: 'Profiel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profiel.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Profiel', link:'profiel'}
      ]
    }
  },
  {
    path: '/voortgang',
    name: 'Voortgang',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Voortgang.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Voortgang', link:'voortgang'}
      ]
    }
  },
  {
    path: '/trainingen/:page',
    name: 'Trainingen',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Trainingen.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Trainingen', link:'trainingen'}
      ]
    }
  },
  {
    path: '/training',
    name: 'Training',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Trainingpagina.vue'),
    meta:{
      requiresAuth: true,
      breadcrumbs: [
        { name: 'Home', link:'home'},
        { name: 'Training', link:'training'}
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
