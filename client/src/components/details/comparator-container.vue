<template>
  <v-content>
    <v-btn v-for="breakpoint, index in breakPoints" :key="index" color="primary" 
    @click="setImages(breakpoint)" :disabled="selected === breakpoint" >
    {{breakpoint}}
    </v-btn>
    <v-btn absolute right color="success" @click="acceptChanges({endpoint: selectedEndpoint, breakPoint: selected})" :disabled="unique">Mark as Legit</v-btn>
    <div v-if="unique">
      <img :src="before" />
    </div>
    <comparator v-else :before="before" :after="after" />
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getStaticLink } from '@/services/utils.service'
  import Comparator from '@/components/details/comparator'
  export default {
    name: 'ComparatorContainer',
    components: {
      Comparator
    },
    async mounted () {
      await this.loadDetails()
      this.prepareData()
    },
    methods: {
      ...mapActions(['getDetails', 'acceptChanges']),
      prepareData () {
        const { shots } = this
        if (!shots) return
        this.breakPoints = Object.keys(shots.legit)
        this.setImages(this.breakPoints[0])
      },
      setImages (breakpoint) {
        this.selected = breakpoint
        this.before = getStaticLink(`legit/${this.shots.legit[breakpoint]}`)
        if (!this.selectedEndpoint.details[breakpoint].match) {
          this.after = getStaticLink(`fishy/${this.shots.fishy[breakpoint]}`)
          this.unique = false
        } else this.unique = true
      },
      async loadDetails () {
        const { id } = this.$route.params
        if (!id) return this.$router.replace({ name: 'endpoint' })
        await this.getDetails(id)
      }
    },
    computed: mapGetters(['shots', 'selectedEndpoint']),
    data: () => ({
      selected: '',
      breakPoints: [],
      before: '',
      after: '',
      unique: false
    })
  }
</script>