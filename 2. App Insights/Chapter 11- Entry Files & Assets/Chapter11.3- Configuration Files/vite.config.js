import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set your desired size limit in kilobytes
  },
  output: {
    manualChunks(id) {
      // Define how to manually split chunks
      if (id.includes('your_module_identifier')) {
        return 'your_desired_chunk_name';
      }
    },
  },
})
