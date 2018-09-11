<template>
  <modal-form :dialog="showForm" title="Add an endpoint" @save="save" @close="close">
    <v-layout wrap>
      <v-flex xs4>
        <v-text-field label="Name" required v-model="data.name"></v-text-field>
      </v-flex>
      <v-flex xs8>
        <v-text-field label="URL" required v-model="data.url"></v-text-field>
      </v-flex>
    </v-layout>
  </modal-form>
</template>

<script>
  import { mapActions } from 'vuex'
  import modalForm from '@/components/_shared/modal-form'
  import bus from '@/services/bus.service'

  export default {
    name: 'endpointForm',
    components: {
      modalForm
    },
    data () {
      return {
        showForm: false,
        data: {},
        newItem: true
      }
    },
    mounted () {
      bus.on('open-endpoint-form', this.openForm)
    },
    methods: {
      ...mapActions(['addEndPoint', 'editEndPoint']),
      openForm (data = {}, newItem = true) {
        this.newItem = newItem
        this.data = data
        this.showForm = true
      },
      async save () {
        const { data: endpoint, newItem } = this
        if (newItem) await this.addEndPoint({ endpoint })
        else await this.editEndPoint({ endpoint })
        this.close()
      },
      close () {
        this.showForm = false
      }
    },
    destroyed () {
      bus.off('open-endpoint-form')
    }
  }
</script>
