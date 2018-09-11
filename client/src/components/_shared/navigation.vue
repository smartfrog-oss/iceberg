<template>
  <v-navigation-drawer dark clipped v-model="drawer" app>
    <v-list dense class="pt-0">
    <v-subheader></v-subheader>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
        <v-list-tile-action>
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'navigation',
  computed: {
    drawer: {
      get () {
        return this.$store.state.state.drawer
      },
      set (value) {
        this.$store.commit('TOGGLE_DRAWER', value)
      }
    }
  },
  data () {
    return {
      items: [
        { title: 'Endpoints', icon: 'edit', to: '/endpoints' }
      ],
      right: null
    }
  }
}
</script>
