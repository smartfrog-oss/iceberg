<template>
  <v-flex>
    <v-btn  fab dark small @click="run(item)" color="teal">
      <v-icon dark v-if="item.status !== 'running'">play_arrow</v-icon>
      <v-progress-circular v-else
      :size="25"
      indeterminate
    ></v-progress-circular>
    </v-btn>
    <v-btn fab dark small @click="addOrEditItem(item)" color="indigo">
      <v-icon dark>edit</v-icon>
    </v-btn>
    <v-btn fab dark small @click="deleteItem(item)" color="red">
      <v-icon dark>delete</v-icon>
    </v-btn>
  </v-flex>
</template>
  
<script>
  import { mapActions } from 'vuex'
  import bus from '@/services/bus.service'

  export default {
    name: 'endpointActions',
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      ...mapActions(['deleteEndPoint', 'runRegression']),
      async run (endpoint) {
        if (endpoint.status === 'running') return
        await this.runRegression({ endpoint })
      },
      addOrEditItem (endpoint) {
        bus.emit('open-endpoint-form', Object.assign({}, endpoint), false)
      },
      deleteItem (endpoint = {}) {
        this.deleteEndPoint({ endpoint })
      }
    }
  }
</script>