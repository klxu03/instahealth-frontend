import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/DashboardPage.vue'),
      },
      {
        path: '/post',
        component: () => import('src/pages/PostQuestionPage.vue'),
      },
      { path: '/login', component: () => import('src/pages/LoginPage.vue') },
      {
        path: '/questions',
        component: () => import('src/pages/QuestionsPage.vue'),
      },
      {
        path: '/register',
        component: () => import('src/pages/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
