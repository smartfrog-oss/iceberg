<template>
  <v-icon :color="color()" >{{icon()}}</v-icon>
</template>

<script>
  export default {
    name: 'breakStatus',
    props: {
      status: {
        type: String,
        default: 'never run'
      }
    },
    methods: {
      color () {
        switch (this.status) {
          case 'not matching':
            return 'red'
          case 'matches':
            return 'green'
          default:
            return 'orange darken-2'
        }
      },
      icon () {
        switch (this.status) {
          case 'not matching':
            return 'highlight_off'
          case 'matches':
            return 'check_circle'
          default:
            return 'error_outline'
        }
      }
    }
  }
</script>