import Cookie from 'js-cookie'
import Client from '@/services/Client'
const client = new Client()

function authentication(to, from, next) {
 
  if (Cookie.get('isLogged')) {
    
    if(!Cookie.get('roles')){
      return next(`/${window.location.search}login`)
    }

    const roleData = JSON.parse(Cookie.get('roles'));

    let role = roleData.find((item)=>{
      let data = item.name.split('.');
      let view = data[0];
      let permission = data[1];
      if(view[0].toUpperCase()+view.substr(1) == to.name && permission === to.meta.permission){
        return item;
      }
    });

    if(!role){
      return next(`/${window.location.search}`+from.fullPath.substr(1))
    }
    
    return next()
  }

  return next(`/${window.location.search}login`)
}


export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Index'),
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {permission: 'read'},
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: authentication,
      },
      {
        path: '/clientes',
        name: 'Customer',
        meta: {permission: 'read'},
        beforeEnter: authentication,
        component: () => import('@/views/pages/Customer.vue'),
      },
      {
        path: '/usuarios',
        name: 'User',
        meta: {permission: 'read'},
        component: () => import('@/views/pages/User.vue'),
        beforeEnter: authentication,
      },      
      {
        path: '/servicos',
        name: 'Service',
        meta: {permission: 'read'},
        component: () => import('@/views/pages/Service.vue'),
        beforeEnter: authentication,
      },     
       {
        path: '/atendimentos/:_id(\\d+)?',
        name: 'Call',
        meta: {permission: 'read'},
        component: () => import('@/views/pages/Call.vue'),
        beforeEnter: authentication,
      },
      {
        path: '/Blank',
        name: 'Blank',
        meta: {permission: 'read'},
        beforeEnter: authentication,
        component: () => import('@/views/pages/Blank.vue'),
      },
      {
        path: '/orcamentos',
        name: 'Order',
        meta: {permission: 'read'},
        beforeEnter: authentication,
        component: () => import('@/views/pages/Order.vue'),
      },
      
      
      // {
      //   path: '/produto',
      //   name: 'Product',
      //   meta: {permission: 'read'},
      //   component: () => import('@/views/pages/Product.vue'),
      //   beforeEnter: authentication,
      // },
    ],
  },
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      return next();
    },
    name: 'Auth',
    component: () => import('@/layouts/AuthenticationLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
      },
      {
        path: '/auth/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
      },
      {
        path: '/auth/reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
      },
      {
        path: '/auth/confirm-password',
        name: 'ConfirmPassword',
        component: () => import('@/views/auth/ConfirmPassword.vue'),
      },
      {
        path: '/auth/verify-email',
        name: 'VerifyEmail',
        component: () => import('@/views/auth/VerifyEmail.vue'),
      },
    ],
  },
]
