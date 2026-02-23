#!/bin/sh
# Запустити після того, як сервер уже працює на порту 8000.
# Дає публічне посилання БЕЗ tunnel password (одразу відкривається сайт).
# Потрібно: brew install cloudflared (якщо ще немає)

set -e
echo "Перевірка, чи слухає порт 8000..."
if ! command -v cloudflared >/dev/null 2>&1; then
  echo "Встанови cloudflared: brew install cloudflared"
  exit 1
fi
echo "Запуск Cloudflare Tunnel (посилання без пароля)..."
exec cloudflared tunnel --url http://localhost:8000
