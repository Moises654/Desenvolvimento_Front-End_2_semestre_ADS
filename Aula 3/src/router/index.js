import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Calendar from '../views/Calendar.vue'
import MaintenanceList from '../views/MaintenanceList.vue'
import MaintenanceDetail from '../views/MaintenanceDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/calendario',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/manutencoes',
    name: 'MaintenanceList',
    component: MaintenanceList
  },
  {
    path: '/manutencao/:id',
    name: 'MaintenanceDetail',
    component: MaintenanceDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router