// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ChangeNumber',
    name: 'ChangeNumber',
    // @ts-ignore
    component: () => import('@/views/tool1/ChangeNumber.vue')
  },
  {
    path: '/ChangeTime',
    name: 'ChangeTime',
    // @ts-ignore
    component: () => import('@/views/tool1/ChangeTime.vue')
  },{
    path: '/ChangePicture',
    name: 'ChangePicture',
    // @ts-ignore
    component: () => import('@/views/tool1/ChangePicture.vue')
  },
  {
    path: '/Map',
    name: 'Map',
    // @ts-ignore
    component: () => import('@/views/tool2/Map.vue')
  },
  {
    path: '/Trans',
    name: 'Trans',
    // @ts-ignore
    component: () => import('@/views/tool2/translation.vue')
  },
  {
    path: '/Weather',
    name: 'Weather',
    // @ts-ignore
    component: () => import('@/views/tool2/Weather.vue')
  },
  {
    path: '/MD5',
    name: 'MD5',
    // @ts-ignore
    component: () => import('@/views/tool3/MD5.vue')
  },
  {
    path: '/Add',
    name: 'Add',
    // @ts-ignore
    component: () => import('@/views/Add.vue')
  },
  {
    path: '/Test',
    name: 'Test',
    // @ts-ignore
    component: () => import('@/views/tool3/Test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
