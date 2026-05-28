import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const repoName = process.env.VITE_REPO_NAME || 'KskMechta'
  const forGhPages = process.env.GH_PAGES === 'true'
  const useRepoBase =
    forGhPages && (command === 'build' || process.env.VITE_PREVIEW_GH === 'true')
  const base = useRepoBase ? `/${repoName}/` : '/'

  return {
    base,
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
    },
    preview: {
      port: 4173,
    },
  }
})
