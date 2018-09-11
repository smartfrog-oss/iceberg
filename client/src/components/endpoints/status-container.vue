<template>
  <span :class="statusClass(status)">{{status}}</span>
</template>

<script>
  export default {
    name: 'statusContainer',
    props: {
      status: {
        type: String,
        default: ''
      }
    },
    methods: {
      statusClass (status) {
        switch (status) {
          case 'running':
            return 'orange--text darken-2'
          case 'matches':
            return 'green--text accent-2'
          case 'not matching':
            return 'red--text accent-2'
          default:
            return ''
        }
      }
    }
  }
</script>