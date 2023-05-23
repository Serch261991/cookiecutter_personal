import { createRouter, createWebHistory } from 'vue-router'
//import ActivityList from '@/components/ActivityList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'login',
      component: () => import('../components/LoginView.vue'),
    },
    {
      path: '/main',
      name: 'dashboard',
      component: () => import('../views/DashBoardView.vue'),
      // children: [
      //   {
      //     path: '/dashboard/activities/:statusId',
      //     name: 'list',
      //     component: ActivityList,
      //   }
      // ]
    },
    {
      path: '/payments/:typeId/:employeeId',
      name: 'payments',
      component: () => import('../views/mpm/RegisterView.vue')
    },
    {
      path: '/payment-adjustment/:requestId',
      name: 'payment-adjustment',
      component: () => import('../views/mpm/EditView.vue')
    },
    {
      path: '/payment-adjustment/list/:activityId',
      name: 'payment-adjustment-list',
      component: () => import('../views/mpm/ListView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/', '/main'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router
