<template>
  <div>
    <hot-table :settings="hotSettings">
      <hot-column title="ID" data="id"> </hot-column>
      <hot-column title="Name" read-only="true" data="name"> </hot-column>
      <hot-column title="Price" data="payment.price"> </hot-column>
      <hot-column title="Currency" data="payment.currency"> </hot-column>
    </hot-table>
    <el-button @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
  import { HotTable, HotColumn } from '@handsontable/vue'
  import { registerAllModules } from 'handsontable/registry'

  // register Handsontable's modules
  registerAllModules()

  export default {
    data() {
      return {
        hotSettings: {
          data: [
            {
              id: 1,
              name: 'Table tennis racket',
              payment: { price: 13, currency: 'PLN' },
            },
            {
              id: 2,
              name: 'Outdoor game ball',
              payment: { price: 14, currency: 'USD' },
            },
            {
              id: 3,
              name: 'Mountain bike',
              payment: { price: 300, currency: 'USD' },
            },
          ],
          height: 'auto',
          licenseKey: 'non-commercial-and-evaluation',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log(this.hotData)
      },
    },
    components: { HotTable, HotColumn },
  }
</script>

<style
  src="../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
