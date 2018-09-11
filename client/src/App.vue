<template>
  <v-app toolbar>
    <navigation/>
    <toolbar @preview="preview" />

    <v-content>
      <v-container fluid>
        <v-flex lg8 offset-lg2 md12>
          <router-view></router-view>
        </v-flex>
      </v-container>

    </v-content>
    <notification />

  </v-app>
</template>

<script>
import toolbar from '@/components/_shared/toolbar'
import navigation from '@/components/_shared/navigation'
import notification from '@/components/_shared/notification'

export default {
  name: 'app',
  components: {
    toolbar,
    navigation,
    notification
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style>

</style>
