<template>
  <v-toolbar dark app clipped-left>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>IceBerger</v-toolbar-title>
      <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>

export default {
  name: 'toolbar',
  methods: {
    toggleDrawer () {
      const value = !this.$store.state.state.drawer
      this.$store.commit('TOGGLE_DRAWER', value)
    }
  }
}
</script>
