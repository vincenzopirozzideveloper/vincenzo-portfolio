import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Output directory changed from 'dist' to 'build'
    chunkSizeWarningLimit: 1000, // Limite più alto ma non eccessivo
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion', 'react-vertical-timeline-component']
        }
      }
    }
  },
  server:{
    allowedHosts: ['portfolio-dev.vm1.vincenzopirozzi.dom']
  }
});
