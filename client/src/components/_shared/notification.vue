<template>
  <v-snackbar v-model="show" :timeout="10000" multi-line buttom right  >
    {{ message }}
    <v-btn dark flat @click.native="hideNotification">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import bus from '@/services/bus.service'

  export default {
    name: 'notification',
    mounted () {
      // const vm = this
      bus.on('notify', this.showNotification)
      // bus.emit('notify', 'success', 'success')
      // bus.emit('notify', 'info', 'info')
      // bus.emit('notify', 'warning', 'warning')
      // bus.emit('notify', 'error', 'error')
    },
    data () {
      return {
        message: null,
        type: null,
        show: false
      }
    },
    methods: {
      showNotification (type, msg) {
        this.type = type
        this.message = msg
        this.show = true
      },
      hideNotification () {
        this.show = false
      }
    }
  }
</script>
