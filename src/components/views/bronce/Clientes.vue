<template>
  <section class="content">
    <div class="container-fluid spark-screen">
      <div class="row">
        <button class="btn btn-primary pull-right" title="Agregar un nuevo usuario">
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
          :css="css"
          :per-page="20"
          pagination-path=""
          @vuetable:pagination-data="onPaginationData" />
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
    </div>
  </section>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

// import config from '@/env.config'

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      url: 'http://vuetable.ratiw.net/api/users',
      css: {
        tableClass: 'table table-hover',
        loadingClass: 'loading',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        sortHandleIcon: 'glyphicon glyphicon-menu-hamburger'
      },
      cssPagination: {
        wrapperClass: 'pagination',
        activeClass: 'btn-primary',
        disabledClass: 'disabled',
        pageClass: 'btn btn-border',
        linkClass: 'btn btn-border',
        icons: {
          first: 'fa fa-angle-double-left',
          prev: 'fa fa-angle-left',
          next: 'fa fa-angle-right',
          last: 'fa fa-angle-double-right'
        }
      },
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
    }
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
