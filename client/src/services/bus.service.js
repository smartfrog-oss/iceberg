import Vue from 'vue'
const bus = new Vue()

export default {
  emit: bus.$emit.bind(bus),
  on: bus.$on.bind(bus),
  off: bus.$off.bind(bus)
}
