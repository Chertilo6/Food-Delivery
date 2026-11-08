# Food-Delivery

Мобильное приложение на Expo (React Native) + Expo Router.

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
| `src/app/location.tsx` | доступ к геопозиции |
| `src/app/home.tsx` | заглушка главного экрана |

Компоненты — `src/components`, цвета и шрифты — `src/theme`, иллюстрации (SVG) — `src/illustrations`.
