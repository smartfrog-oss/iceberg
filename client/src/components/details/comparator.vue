<style>
  .image-compare-handle {
    color: #757575 !important
  }
</style>

<template>
  <section>
    <image-compare :before="before" :after="after" :padding="padding">
        <v-icon large slot="icon-left">chevron_left</v-icon>
        <v-icon large slot="icon-right">chevron_right</v-icon>
    </image-compare>
  </section>
</template>
  
<script>
  export default {
    name: 'Comparator',
    props: {
      before: {
        type: String,
        default: ''
      },
      after: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      padding: {
        left: 40,
        right: 40
      }
    })
  }
</script>