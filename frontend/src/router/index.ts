import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: () => { return { path: '/login' } }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import('../views/OverviewView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateView.vue')
  },
  {
    path: '/vehicle/:id',
    name: 'vehicle',
    component: () => import('../views/CreateVehicleView.vue'),
    props: true
  },
  {
    path: '/createReview/:id/:user',
    name: 'createReview',
    props: true,
    component: () => import('../views/CreateReviewView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'registe',
    component: () => import('../views/RegisterView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
