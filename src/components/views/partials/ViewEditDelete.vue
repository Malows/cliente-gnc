<template>
  <div>
    <div class="btn-group hidden-xs hidden-sm">
      <button type="button" class="btn btn-primary" @click="itemAction('view-item', rowData, rowIndex)"><i class="fa fa-eye"></i></button>
      <button type="button" class="btn btn-primary" @click="itemAction('edit-item', rowData, rowIndex)"><i class="fa fa-pencil"></i></button>
      <button type="button" class="btn btn-primary" @click="itemAction('delete-item', rowData, rowIndex)"><i class="fa fa-trash"></i></button>
    </div>
    <div class="btn-group-vertical hidden-md hidden-lg">
      <button type="button" class="btn btn-primary" @click="itemAction('view-item', rowData, rowIndex)"><i class="fa fa-eye"></i></button>
      <button type="button" class="btn btn-primary" @click="itemAction('edit-item', rowData, rowIndex)"><i class="fa fa-pencil"></i></button>
      <button type="button" class="btn btn-primary" @click="itemAction('delete-item', rowData, rowIndex)"><i class="fa fa-trash"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    itemAction (action, data, index) {
      console.log('custom-actions: ' + action, data.name, index)
    }
  }
}
</script>

<style lang="css">
</style>
