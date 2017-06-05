<template>
  <section class="content">
    <div class="container-fluid spark-screen">
      <div class="row">
        <button class="btn btn-primary pull-right" @click="toggleCrear" title="Agregar un nuevo usuario">
          <i class="fa fa-plus"></i>
        </button>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <vuetable-pagination-info
              ref="paginationInfoTop"
              info-template="Mostrando del {from} al {to} de {total} clientes"/>
          </div>
          <div class="col-md-4 col-md-offset-4">
            <vuetable-pagination
              ref="paginationTop"
              :css="cssPagination"
              @vuetable-pagination:change-page="onChangePage" />
          </div>
        </div>
        <vuetable
          ref="vuetable"
          :api-url="url"
          :fields="fields"
          :css="cssTable"
          :per-page="20"
          pagination-path=""
          @vuetable:pagination-data="onPaginationData"
          @view-item="onViewClick" />
        <div class="row text-center">
          <vuetable-pagination-info
            ref="paginationInfo"
            info-template="Mostrando del {from} al {to} de {total} clientes"
            info-class="pull-left" />
          <vuetable-pagination
            ref="pagination"
            :css="cssPagination"
            @vuetable-pagination:change-page="onChangePage" />
        </div>
      </div>
      <modal :title="modalDatos.title" :is-show="modalDatos.isShow" transition="fade" @close="shownModal"
        :on-ok="okModal">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" name="nombre" value="" class="form-control" placeholder="Nombre" v-model="modalDatos.nombre">
        </div>
        <div class="form-group">
          <label for="apellido">Apellido</label>
          <input type="text" name="apellido" value="" class="form-control" placeholder="Apellido" v-model="modalDatos.apellido">
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <label for="">DNI</label>
              <input type="text" name="dni" value="" class="form-control" placeholder="DNI" v-model="modalDatos.dni">
            </div>
            <div class="col-md-6">
              <label for="telefono">Teléfono</label>
              <input type="text" name="telefono" value="" class="form-control" placeholder="Teléfono" v-model="modalDatos.telefono">
            </div>
          </div>
        </div>
      </modal>
      <!-- Confirmacion  -->
      <modal :title="'Confirmación'" :width="520" :is-show="modalBorrar.isShow" transition="fade" @close="modalBorrar.isShow = false"
        :on-ok="okModalBorrar">
        <p>¿Desea borrar este usuario?</p>
        <div slot="footer">
          <button type="button" class="btn btn-default" @click="modalBorrar.isShow = false">No</button>
          <button type="button" class="btn btn-danger" @click="okModalBorrar">Sí</button>
        </div>
      </modal>
      <button @click="toggleBorrar" class="button is-primary">basic modal</button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
// import modalDatos from '../partials/modalDatos.vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import ViewEditDelete from '../partials/ViewEditDelete.vue'
import { cssTable, cssPagination } from '../partials/tableConfig'

Vue.component('view-edit-delete', ViewEditDelete)
// import config from '@/env.config'

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      modalDatos: {
        title: '',
        action: '',
        isShow: false,
        nombre: '',
        apellido: '',
        dni: '',
        telefono: ''
      },
      modalBorrar: {
        isShow: false,
        id: ''
      },
      url: 'http://vuetable.ratiw.net/api/users',
      cssTable: cssTable,
      cssPagination: cssPagination,
      fields: [
        {
          name: 'name',
          title: 'Nombre'
        },
        {
          name: 'email',
          title: 'Email'
        },
        {
          name: 'birthdate',
          title: 'Cumpleaños'
        },
        {
          name: 'gender',
          title: 'Género'
        },
        {
          name: '__component:view-edit-delete',
          title: 'Opciones'
        }
      ]
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.paginationTop.setPaginationData(paginationData)
      this.$refs.paginationInfoTop.setPaginationData(paginationData)

      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    toggleCrear () {
      this.modalDatos.isShow = !this.modalDatos.isShow
      this.modalDatos.action = 'crear'
      this.modalDatos.title = 'Crear un nuevo cliente'
    },
    toggleEditar (buddie) {
      this.modalDatos.isShow = !this.modalDatos.isShow
      this.modalDatos.action = 'editar'
      this.modalDatos.title = 'Editar un cliente existente'
      this.modalDatos.nombre = buddie.nombre
      this.modalDatos.apellido = buddie.apellido
      this.modalDatos.dni = buddie.dni
      this.modalDatos.telefono = buddie.telefono
    },
    toggleBorrar () {
      this.modalBorrar.isShow = true
    },
    okModal () {
      if (this.modalDatos.action === 'crear') {
        console.log('Dale para adelante en crear un nuevo cliente')
      }
      if (this.modalDatos.action === 'editar') {
        console.log('Voy a editar un cliente')
      }
      console.log(this.modalDatos)
      this.shownModal()
    },
    okModalBorrar () {
      console.log('Voy a borrar a alguien')
      console.log(this.modalBorrar.id || 'nadie elegido')
      this.modalBorrar.isShow = false
    },
    shownModal () {
      console.log('No vamos a crear un nuevo cliente')
      this.modalDatos.isShow = false
      this.modalDatos.title = ''
      this.modalDatos.action = ''
      this.modalDatos.nombre = ''
      this.modalDatos.apellido = ''
      this.modalDatos.dni = ''
      this.modalDatos.telefono = ''
    },
    onViewClick (rowData, rowIndex) {
      console.log('YEAH')
    }
  },
  created () {
    window.bus.$on('onViewClick', (rowData, rowIndex) => {
      console.log('FUCK')
    })
    window.bus.$on('view-item', () => {
      alert('FUCK YEAH!')
    })
  }
}
</script>

<style lang="css" scoped>
.pagination {
  margin-top: 0;
}
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
.vuetable-pagination-info {
  margin-top: 8px !important;
}
</style>
