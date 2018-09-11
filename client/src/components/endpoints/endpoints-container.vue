<style>

</style>

<template>
  <section>
    <v-toolbar flat color="white">
      <v-toolbar-title>Endpoints list</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="endpoints"
      item-key="name"
    >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center"><a :href="props.item.url" target="_blank">{{ props.item.url }}</a></td>
        <td class="text-xs-center"><status-container :status="props.item.status" /></td>
        <td class="text-xs-center">{{ props.item.lastCheck }}</td>
        <td class="text-xs-center">
          <endpoint-actions :item="props.item" />
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
       <v-layout row wrap v-for="(status, breakpoint) in props.item.details" :key="breakpoint">
        <v-flex xs8 >
          <p class="text-xs-center">{{breakpoint}}</p>
        </v-flex>
        <v-flex xs4>            
          <break-status :status="status" />
        </v-flex>
       </v-layout>
       <div class="text-xs-center">
        <v-btn outline color="indigo" @click="handleClick(props.item.id)" :disabled="props.item.status === 'running'">
          Get details
          <v-icon right dark>arrow_right</v-icon>
        </v-btn>
       </div>
    </template>
    </v-data-table>
  </section>
</template>

<script>
  import statusContainer from '@/components/endpoints/status-container'
  import endpointActions from '@/components/endpoints/endpoint-actions'
  import breakStatus from '@/components/endpoints/break-status'

  import { mapGetters } from 'vuex'

  export default {
    name: 'endpoinstContainer',
    components: { statusContainer, endpointActions, breakStatus },
    data: () => ({
      search: '',
      headers: [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'URL', value: 'link', align: 'center' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Last Check', value: 'lastCheck', align: 'center' },
        { text: 'Actions', value: 'run', sortable: false, align: 'center' }
      ]
    }),
    computed: mapGetters(['endpoints']),
    methods: {
      handleClick (id) {
        this.$router.push({ name: 'Details', params: { id }})
      }
    }
  }
</script>