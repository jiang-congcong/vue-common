import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Main',
//       redirect: "/home",
//       component: () => import('../views/Main.vue'),
//       children: [
//         {
//           path: 'home',
//           name: 'Home',
//           component: () => import('../views/main/HomeView.vue')
//         },
//         {
//           path: 'user',
//           name: 'User',
//           component: () => import('../views/main/User.vue')
//         },
//       ]
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: () => import('../views/Login.vue')
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: () => import('../views/Register.vue')
//     },
//   ]
// })

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: "/home",
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/main/HomeView.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/main/User.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: () => import('../views/NoPermission.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由权限控制
router.beforeEach((to, from, next) => {
  //管理员菜单，后面记得加
  let managerMenu = ['/user'];

  //普通用户菜单
  let userMenu = [];

  let user = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : {}

  if(user.role === 'manager') { //管理员
    if(!managerMenu.includes(to.path)) {
      //跳转到403页面
      next('/403')
    } else {
      next()
    }
  } else if(user.role === 'user'){ //普通用户
    if(!userMenu.includes(to.path)) {
      //跳转到403页面
      next('/403')
    } else {
      next()
    }
  } else {
    next()
  }

})

export default router

