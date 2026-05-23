# Автосервис «Катюша» — лендинг

Одностраничный сайт для автосервиса в Подольске: Next.js, TypeScript, Tailwind CSS, Framer Motion, SEO, юридические страницы и backend для заявок.

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Проверка

```bash
npm run typecheck
npm run build
```

## Env-переменные

Создайте `.env.local` по примеру `.env.example`:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
LEADS_EMAIL_TO=
NEXT_PUBLIC_SITE_URL=https://example.ru
```

## Telegram

1. Создайте бота через BotFather и получите `TELEGRAM_BOT_TOKEN`.
2. Узнайте `TELEGRAM_CHAT_ID` чата или канала, куда нужно присылать заявки.
3. Укажите оба значения в `.env.local`.

Если переменные не заданы, сайт продолжит работать, а заявка будет сохраняться локально.

## Email

Для дубля заявки на email заполните:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `LEADS_EMAIL_TO`

Если SMTP не настроен, отправка email пропускается без показа технической ошибки пользователю.

## Где менять данные бизнеса

Основные данные, услуги, отзывы, FAQ и SEO-тексты лежат в `lib/site-data.ts`.

Hero-изображение находится в `public/images/katyusha-hero.png`. Это нейтральный визуал автосервиса, не заявленный как реальное фото «Катюши».

## Заявки

Endpoint: `POST /api/lead`.

Что реализовано:

- серверная валидация обязательных полей;
- honeypot-поле от спама;
- rate limit по IP;
- нормализация телефона;
- отправка в Telegram при наличии env;
- отправка email при наличии SMTP env;
- локальная запись в `leads/leads.jsonl`.

## SEO

Реализованы:

- title и description;
- Open Graph и Twitter Card;
- canonical;
- `public/robots.txt`;
- `app/sitemap.ts`;
- JSON-LD Schema.org `AutoRepair`;
- semantic sections;
- alt-текст для hero-изображения.

## Деплой

Проект можно деплоить на Vercel или любой Node.js хостинг с поддержкой Next.js.

Перед деплоем:

1. Укажите production URL в `NEXT_PUBLIC_SITE_URL`.
2. Добавьте Telegram/SMTP переменные, если нужны уведомления.
3. Проверьте `npm run build`.
