<template lang="html">
  <div class="modal fade" ref="modalDatos" :id="id" tabindex="-1" role="dialog" aria-labelledby="modalDatos">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close" ><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{titulo}}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" value="" class="form-control" placeholder="Nombre">
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" name="apellido" value="" class="form-control" placeholder="Apellido">
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <label for="">DNI</label>
                <input type="text" name="dni" value="" class="form-control" placeholder="DNI">
              </div>
              <div class="col-md-6">
                <label for="telefono">Teléfono</label>
                <input type="text" name="telefono" value="" class="form-control" placeholder="Teléfono">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="close" >Cerrar</button>
          <button type="submit" name="submit" class="btn btn-success">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: [ 'titulo', 'id' ],
  methods: {
    close () {
      this.$ref.modalDatos.modal('hide')
    }
  },
  mounted () {
    $(this.$el).modal('hide')
  },
  beforeDestroy () {
    $(this.$el).modal('hide')
  }
}
</script>

<style lang="css">
</style>
