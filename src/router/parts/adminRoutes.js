import DashboardView from '@/views/admin/DashboardView.vue'

export const adminRoutes = [
  {
    name: 'admin',
    path: '/admin',
    component: DashboardView,
    meta: { layout: 'admin' },
  },
]
