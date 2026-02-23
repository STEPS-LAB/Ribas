#!/bin/sh
# Публічне посилання через ngrok (без сторінки з паролем).
# 1. Реєстрація: https://dashboard.ngrok.com/signup
# 2. Взяти токен: https://dashboard.ngrok.com/get-started/your-authtoken
# 3. Один раз: ngrok config add-authtoken ТВІЙ_ТОКЕН
# 4. Переконайся, що сервер на 8000 вже запущений (див. нижче).
# 5. Запусти: ./ngrok-start.sh

set -e
if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok не знайдено. Встанови: brew install ngrok"
  exit 1
fi
if ! lsof -i :8000 >/dev/null 2>&1; then
  echo "Сервер на порту 8000 не запущений."
  echo "Спочатку в іншому терміналі запусти:"
  echo "  cd $(dirname "$0")/out && python3 -m http.server 8000 --bind 0.0.0.0"
  exit 1
fi
echo "Запуск ngrok (публічне посилання з'явиться нижче)..."
exec ngrok http 8000
