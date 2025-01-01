import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/setup',
        component: () => import('pages/Setup.vue')
      },
      {
        path: '/display',
        component: () => import('pages/GridDisplay.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/SettingsDialog.vue')
      }

    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
