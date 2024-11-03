import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

const isAnalyzeMode = process.env.ANALYZE === 'true';

// https://vite.dev/config/
export default defineConfig({
  base: '/passport',
  build: {
    outDir: './docs'
  },
  plugins: [
    react(),
    ...(isAnalyzeMode ? [visualizer({
      open: true, // Открыть визуализатор в браузере после сборки
      filename: 'stats.html', // Имя файла для визуализации
      gzipSize: true, // Показать размеры после сжатия gzip
    })] : [])
  ],
})
