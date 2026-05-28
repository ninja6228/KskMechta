import { copyFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'

// SPA: при прямом заходе на /program/... GitHub Pages отдаёт 404.html → index.html
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')

console.log('GitHub Pages: созданы 404.html и .nojekyll')
