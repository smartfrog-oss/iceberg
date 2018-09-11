<template>
  <comparator-container />
</template>

<script>
  import Vue from 'vue'
  import VueImageCompare from 'vue-image-compare'
  
  Vue.use(VueImageCompare)
  
  import ComparatorContainer from '@/components/details/comparator-container'
  export default {
    name: 'DetailsPage',
    components: {
      ComparatorContainer
    }
  }
</script>