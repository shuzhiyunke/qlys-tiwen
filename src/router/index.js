import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'vister',
    component: () => import(/* webpackChunkName: "about" */ '@/views/vister.vue'),
    meta: {
      title: '访客登记'
    }
  },
  {
    path: '/securityStaff',
    name: 'securityStaff',
    component: () => import(/* webpackChunkName: "about" */ '@/views/security.vue'),
    meta: {
      title: '访客列表'
    }
  },
  {
    path: '/detail/visitor/:id',
    name: 'detailVisitor',
    component: () => import(/* webpackChunkName: "about" */ '@/views/detail/visitor.vue'),
    meta: {
      title: '访客详情'
    }
  },
  {
    path: '/detail/member/:id',
    name: 'detailMember',
    component: () => import(/* webpackChunkName: "about" */ '@/views/detail/member.vue'),
    meta: {
      title: '员工详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
