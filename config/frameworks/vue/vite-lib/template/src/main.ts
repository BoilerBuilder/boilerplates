import { createApp } from 'vue'
import App from './App.vue'

// This file serves as an example of how to use the library components
createApp(App).mount('#app')

// Export components for library use
export { default as Counter } from './components/Counter.vue'
export { default as HelloWorld } from './components/HelloWorld.vue'