import DashboardView from '@/views/admin/DashboardView.vue'

export const adminRoutes = [
  {
    name: 'admin',
    path: '/admin',
    component: DashboardView,
    meta: { layout: 'admin', requiresAuth: true },
  },
  {
    name: 'admin.master.tags',
    path: '/admin/master/tags',
    component: () => import('@/views/admin/master/tags/IndexView.vue'),
    meta: { layout: 'admin', requiresAuth: true },
  },
  {
    name: 'admin.master.tags.create',
    path: '/admin/master/tags/create',
    component: () => import('@/views/admin/master/tags/CreateView.vue'),
    meta: { layout: 'admin', requiresAuth: true },
  },
  {
    name: 'admin.master.tags.edit',
    path: '/admin/master/tags/:id/edit',
    component: () => import('@/views/admin/master/tags/EditView.vue'),
    meta: { layout: 'admin', requiresAuth: true, params: { id: 'id' } },
  },
]
