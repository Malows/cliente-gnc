import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import Usuarios from './components/views/admin/Usuarios.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'usuarios',
        component: Usuarios,
        name: 'Usuarios',
        meta: { description: 'Administración general de usuarios', requireAuth: true }
      }, {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: { description: 'Overview of environment', requireAuth: true }
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: { description: 'Simple and advance table in CoPilot', requireAuth: true }
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: { description: 'Tasks page in the form of a timeline', requireAuth: true }
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: { description: 'User settings page', requireAuth: true }
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: { description: 'Example of using maps', requireAuth: true }
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: { description: 'List of our servers', requireAuth: true }
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: { description: 'List of popular javascript repos', requireAuth: true }
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
