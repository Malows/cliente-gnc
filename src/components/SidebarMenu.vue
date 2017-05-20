<template>
  <ul class="sidebar-menu">
    <li class="header">CLIENTES</li>
    <li class="pageLink" :class="[{ active: inCurrentRoute('Clientes') }]">
      <a href="#">
        <i class="fa fa-users fa-lg"></i>
        <span class="page"> Clientes</span>
      </a>
    </li>
    <li class="pageLink" :class="[{ active: inCurrentRoute('Vehiculos') }]">
      <a href="#">
        <i class="fa fa-car fa-lg"></i>
        <span class="page"> Vehículos</span>
      </a>
    </li>
    <li class="pageLink" :class="[{ active: inCurrentRoute('Cilindros') }]">
      <a href="#">
        <i class="fa fa-circle-o fa-lg"></i>
        <span class ="page">Cilíndros</span>
      </a>
    </li>

    <li class="treeview" v-if="tipo_de_usuario <= 5" :class="[{ active: inCurrentRoute(['Trabajos de taller','Servicios de taller'])}]">
      <a href="#">
        <i class="fa fa-wrench fa-lg"></i>
        <span>Taller</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li :class="[{ active: inCurrentRoute('Trabajos de taller')}]">
          <a href="#">
            <i class="fa fa-wrench fa-lg"></i>
            <span class="page"> Trabajos</span>
          </a>
        </li>
        <li :class="[{ active: inCurrentRoute('Servicios de taller')}]">
          <a href="#">
            <i class="fa fa-briefcase fa-lg"></i>
            <span class="page"> Servicios</span>
          </a>
        </li>
      </ul>
    </li>
      <li class="header" v-if="tipo_de_usuario <= 4">SERVICIOS</li>
      <li class="pageLink" :class="[{ active: inCurrentRoute('Ventas') }]" v-if="tipo_de_usuario <= 4">
        <a href="#">
          <i class="fa fa-table fa-lg"></i>
          <span class="page"> Ventas</span>
        </a>
      </li>
      <li class="pageLink" :class="[{ active: inCurrentRoute('Stock') }]" v-if="tipo_de_usuario <= 4">
        <a href="#">
          <i class="fa fa-tasks fa-lg"></i>
          <span class="page"> Stock</span>
        </a>
      </li>
      <li class="pageLink" :class="[{ active: inCurrentRoute('Registros') }]" v-if="tipo_de_usuario <= 4">
        <a href="#">
          <i class="fa fa-server fa-lg"></i>
          <span class="page"> Registros</span>
        </a>
      </li>


    <li class="treeview" :class="[{ active: inCurrentRoute(['Localidades','Modelos de autos','Marcas de cilindros','Registros disponibles'])}]">
      <a href="#">
        <i class="fa fa-folder-o fa-lg"></i>
        <span>Recursos</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li :class="[{ active: inCurrentRoute('Localidades')}]">
          <a href="#">
            <i class="fa fa-circle fa-lg"></i>
            <span class="page"> Localidades</span>
          </a>
        </li>
        <li :class="[{ active: inCurrentRoute('Modelos de autos')}]">
          <a href="#">
            <i class="fa fa-circle fa-lg"></i>
            <span class="page"> Modelos de autos</span>
          </a>
        </li>
        <li :class="[{ active: inCurrentRoute('Marcas de cilindros')}]">
          <a href="#">
            <i class="fa fa-circle fa-lg"></i>
            <span class="page"> Marcas de cilindros</span>
          </a>
        </li>
        <li :class="[{ active: inCurrentRoute('Registros disponibles')}]">
          <a href="#">
            <i class="fa fa-book fa-lg"></i>
            <span class="page"> Registros disponibles</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="header" v-if="tipo_de_usuario <= 3">PERSONALIZACION</li>
    <li v-if="tipo_de_usuario <= 3" :class="[{ active: inCurrentRoute('Registros personalizados')}]">
      <a href="#">
        <i class="fa fa-circle fa-lg"></i>
        <span class="page"> Registros personalizados</span>
      </a>
    </li>

    <li class="treeview" v-if="tipo_de_usuario === 1" :class="[{ active: inCurrentRoute(['Usuarios','Tipos de usuarios','Tickets'])}]">
      <a href="#">
        <i class="fa fa-empire fa-lg"></i>
        <span>Administrador</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li :class="[{active: inCurrentRoute('Usuarios')}]">
          <router-link to="usuarios">
            <i class="fa fa-user fa-lg"></i>
            <span class="page"> Usuarios</span>
          </router-link>
        </li>
        <li :class="[{active: inCurrentRoute('Tipos de usuarios')}]">
          <a href="#">
            <i class="fa fa-users fa-lg"></i>
            <span class="page"> Tipos de usuarios</span>
          </a>
        </li>
        <li :class="[{active: inCurrentRoute('Tickets')}]">
          <a href="#">
            <i class="fa fa-ticket fa-lg"></i>
            <span class="page"> Tickets</span>
          </a>
        </li>
      </ul>
    </li>
    <li class="header">TOOLS</li>
    <li class="pageLink" :class="[{ active: inCurrentRoute('Dashboard') }]">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="pageLink" :class="[{ active: inCurrentRoute('Tables') }]">
      <router-link to="/tables"><i class="fa fa-table"></i>
        <span class="page">Tables</span>
      </router-link>
    </li>

    <li class="header">ME</li>
    <li class="pageLink">
      <router-link to="/tasks">
        <i class="fa fa-tasks"></i>
        <span class="page">Tasks</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/setting">
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </router-link>
    </li>

    <li class="header">LOGS</li>
    <li class="pageLink">
      <router-link to="/access"><i class="fa fa-book"></i>
        <span class="page">Access</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/server"><i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </router-link>
    </li>

    <li class="pageLink">
      <router-link to="/repos"><i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </router-link>
    </li>

    <li class="header">PAGES</li>
    <li class="pageLink">
      <router-link to="/login">
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> Login</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/404"><i class="fa fa-circle-o text-red"></i>
        <span class="page"> 404</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SidebarName',
  data () {
    return {
      tipo_de_usuario: this.$store.state.user.tipo_usuario_id,
      currentRoute: this.$route.name
    }
  },
  methods: {
    inCurrentRoute (route) {
      // if is string
      if (typeof route === 'string') {
        // return a bool if the route and the selected element match
        return route === this.$route.name
        // if pass an array as argument with the proper routes
      } else if (Object.prototype.toString.call(route) === '[object Array]') {
        // i do an application of the DeMorgan Law, negation of the conjuntion is the disjuntion of the negations
        return !route.reduce((anterior, actual) => { return anterior && actual !== this.$route.name }, true)
      } else {
        // Strange cases, bad applying
        return false
      }
    }
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
