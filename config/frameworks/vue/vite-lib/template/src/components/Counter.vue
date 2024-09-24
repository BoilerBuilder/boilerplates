<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Counter',
  setup() {
    const title = ref('Counter Component')
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    const decrement = () => {
      count.value--
    }

    return {
      title,
      count,
      increment,
      decrement
    }
  }
})
</script>

<style scoped>
button {
  margin: 0 5px;
}
</style>