import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login: () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index: () => import('@/views/index/index'),
  users: () => import('@/views/users/users'),
  addManager: () => import('@/views/addManager/addManager'),
  userDetails: () => import('@/views/userDetails/userDetails'),
  changeInfo: () => import('@/views/changeInfo/changeInfo'),
  changePassword: () => import('@/views/changePassword/changePassword'),
  allBook: () => import('@/views/allBook/allBook'),
  bookClassification: () => import('@/views/bookClassification/bookClassification'),
  bookEdit: () => import('@/views/bookEdit/bookEdit')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      redirect: '/layout/index', 
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'index',
          component: components.index
        },
        {
          path: 'users',
          meta: {
            title: '用户管理'
          },
          component: components.users,
        },
        {
          path: 'addManager',
          component: components.addManager
        },
        {
          path: 'userDetails',
          component: components.userDetails
        },
        {
          path: 'changeInfo',
          component: components.changeInfo
        },
        {
          path: 'changePassword',
          component: components.changePassword
        },
        {
          path: 'allBook',
          component: components.allBook
        },
        {
          path: 'bookClassification',
          component: components.bookClassification
        },
        {
          path: 'bookEdit',
          component: components.bookEdit
        }
      ]
    }
  ]
})
