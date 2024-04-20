<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const count = ref(0);

        function increment() {
            count.value++;
        }

        return {
            count,
            increment,
        };
    },
});
</script>