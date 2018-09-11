<template>
  <section>
    <endpoints-container/>
    <fab-add @click="addEndPoint" />
    <endpointForm/>
  </section>
</template>

<script>
  import endpointsContainer from '@/components/endpoints/endpoints-container'
  import endpointForm from '@/components/endpoints/endpoints-form'
  import fabAdd from '@/components/_shared/fab-add'
  import bus from '@/services/bus.service'

  import { mapActions } from 'vuex'

  export default {
    name: 'configuration-page',
    components: {
      endpointsContainer,
      fabAdd,
      endpointForm
    },
    async mounted () {
      await this.getEndpoints()
    },
    methods: {
      ...mapActions(['getEndpoints']),
      addEndPoint () {
        bus.emit('open-endpoint-form')
      }
    }
  }

</script>
