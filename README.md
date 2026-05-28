# КСК «Мечта» — сайт клуба

React + Vite. Сайт на GitHub Pages: `https://ninja6228.github.io/KskMechta/`

## Разработка

```bash
npm install
npm run dev
```

## Сборка и публикация

```bash
npm run build:gh      # сборка для GitHub Pages
npm run preview:gh    # проверка локально
```

**GitHub Actions:** Settings → Pages → Source: **GitHub Actions** (пуш в `main` деплоит автоматически).

**Вручную:** `npm run deploy` → в Pages выбрать ветку `gh-pages`.
