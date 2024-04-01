import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({ include: ['src'] })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            formats: ['es']
        },
        rollupOptions: {
            external: [],
        }
    }
})
