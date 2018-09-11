<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>

            <slot></slot>

          </v-container>
          <small>*required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="close" color="warning">Close</v-btn>
          <v-btn dark @click="save" color="info">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'modal-form',
    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      save () {
        this.$emit('save')
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>
