<template>
  <v-fab-transition>
    <v-btn class="indigo" dark fab fixed bottom right @click="clicked" >
      <v-icon>add</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    name: 'fab-add',
    methods: {
      clicked () {
        this.$emit('click')
      }
    }
  }
</script>
