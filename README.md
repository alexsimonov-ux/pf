# ⬆ Antigravity — HR Platform

Прототип HR-платформы на React + Vite с автоматическим деплоем на GitHub Pages.

## 🚀 Запуск локально

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`

## 📦 Деплой на GitHub Pages

### Автоматически (рекомендуется)

При каждом пуше в ветку `main` GitHub Actions автоматически соберёт и задеплоит приложение.

**Настройка один раз:**

1. Пуш кода в репозиторий на GitHub
2. Зайди в репозиторий → **Settings** → **Pages**
3. В разделе "Source" выбери **GitHub Actions**
4. Готово! После следующего пуша сайт будет на:
   `https://<твой-username>.github.io/antigravity/`

### Вручную

```bash
npm run build
npm run deploy
```

> ⚠️ Не забудь в `vite.config.js` поменять `base: '/antigravity/'` на имя своего репозитория!

## 🗂 Структура

```
antigravity/
├── src/
│   ├── App.jsx       # Весь UI и логика
│   └── main.jsx      # Точка входа
├── index.html
├── vite.config.js    # ← поменяй base на имя репо
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml  # Авто-деплой
```

## 📱 Экраны

- **Дашборд** — статистика, активность, быстрые действия
- **Сотрудники** — список с поиском, статусы
- **Рекрутинг** — вакансии и кандидаты
- **Ревью** — performance reviews
- **Настройки** — конфигурация компании
