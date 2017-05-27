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
// Lvl 6
import Clientes from './components/views/bronce/Clientes.vue'
import Vehiculos from './components/views/bronce/Vehiculos.vue'
import Cilindros from './components/views/bronce/Cilindros.vue'

// Lvl 1
import Usuarios from './components/views/admin/Usuarios.vue'
import TiposDeUsuarios from './components/views/admin/TiposDeUsuarios.vue'
import Tickets from './components/views/admin/Tickets.vue'

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
        path: 'clientes',
        component: Clientes,
        name: 'Clientes',
        meta: {
          description: 'Administración general de clientes',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'vehiculos',
        component: Vehiculos,
        name: 'Vehiculos',
        meta: {
          description: 'Administración general de vehículos',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'cilindros',
        component: Cilindros,
        name: 'Cilindros',
        meta: {
          description: 'Administración general de cilindros',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'usuarios',
        component: Usuarios,
        name: 'Usuarios',
        meta: {
          description: 'Administración general de usuarios',
          requireAuth: true,
          authorizationLevel: 1
        }
      },
      {
        path: 'tipos_de_usuarios',
        component: TiposDeUsuarios,
        name: 'Tipos de usuarios',
        meta: {
          description: 'Administración general de tipos de usuarios',
          requireAuth: true,
          authorizationLevel: 1
        }
      },
      {
        path: 'tickets',
        component: Tickets,
        name: 'Tickets',
        meta: {
          description: 'Tickets de usuarios',
          requireAuth: true,
          authorizationLevel: 1
        }
      },
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {
          description: 'Overview of environment',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {
          description: 'Simple and advance table in CoPilot',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {
          description: 'Tasks page in the form of a timeline',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {
          description: 'User settings page',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {
          description: 'Example of using maps',
          requireAuth: true,
          authorizationLevel: 66
        }
      },
      {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {
          description: 'List of our servers',
          requireAuth: true,
          authorizationLevel: 6
        }
      },
      {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {
          description: 'List of popular javascript repos',
          requireAuth: true,
          authorizationLevel: 6
        }
      }
    ]
  },
  {
    // not found handler
    path: '*',
    name: 'Not found',
    component: NotFoundView
  }
]

export default routes
