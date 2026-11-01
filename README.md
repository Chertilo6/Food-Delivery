# Food-Delivery

Мобильное приложение на Expo (React Native) + Expo Router. 10 экранов по макету, интерфейс на русском.

## Запуск в Expo Go (по QR-коду)
1. Установите **Expo Go** на телефон (App Store / Google Play).
2. Откройте терминал **в папке, где лежит `package.json`** (папка `node_modules` уже установлена).
3. Выполните:
   ```bash
   npx expo start
   ```
4. Отсканируйте QR-код: на Android — из приложения Expo Go, на iPhone — обычной камерой.
5. Телефон и компьютер должны быть в **одной Wi-Fi сети**. Если QR не открывается (разные сети, VPN, фаервол):
   ```bash
   npx expo start --tunnel
   ```

## Структура
| Файл | Назначение |
|---|---|
| `index.ts` | точка входа, регистрирует `App` |
| `App.tsx` | корневой компонент (подключает Expo Router) |
| `src/app/index.tsx` | заставка с логотипом |
| `src/app/splash-two.tsx` | заставка с лучами |
| `src/app/onboarding-one/two/three.tsx` | три экрана приветствия |
| `src/app/(auth)/login.tsx` | Вход |
| `src/app/(auth)/signup.tsx` | Регистрация |
| `src/app/(auth)/forgot-password.tsx` | Забыли пароль |
| `src/app/(auth)/verification.tsx` | Подтверждение (код, таймер, цифровая клавиатура) |
| `src/app/home.tsx` | заглушка главного экрана |

Компоненты — `src/components`, цвета и шрифты — `src/theme`, иллюстрации (SVG) — `src/illustrations`.
