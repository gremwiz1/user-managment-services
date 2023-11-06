# User Management Services

Проект включает в себя два микросервиса:
- `user-service` для управления пользователями
- `user-history-service` для отслеживания истории действий пользователей

## Предварительные условия

Перед запуском убедитесь, что установлены:
- Node.js (последняя стабильная версия)
- PostgreSQL (10+ версия)

## Настройка баз данных

Для работы сервисов необходимо создать базы данных с соответствующими таблицами.

### Создание баз данных

Запустите следующие команды для создания баз данных:

```sql
CREATE DATABASE user_service_db;
CREATE DATABASE user_history_db;
```

Создание таблиц
Для user-service:

Переключитесь на базу данных user_service_db и выполните:

\c user_service_db

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);
```

Для user-history-service:

Переключитесь на базу данных user_history_db и выполните:

\c user_history_db

```sql
CREATE TABLE user_actions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  action_type VARCHAR(50) NOT NULL,
  action_details TEXT NOT NULL,
  action_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Запуск сервисов

Перед запуском проектов необходимо внести изменнения для подключения к базе данных.
Вам нужно изменить в обоих микросервисах файл расположенный в src/db/index

Запуск сервисов
Каждый сервис содержит свой собственный package.json файл и должен быть запущен отдельно.

user-service
Перейдите в каталог user-service и установите зависимости:
```bash
cd user-service/
npm install
```

Затем запустите сервис:
```bash
npm start
```
user-history-service

Перейдите в каталог user-history-service и установите зависимости:
```bash
cd user-history-service/
npm install
```

Скомпилируйте TypeScript в JavaScript:
```bash
npm run build
```

И запустите скомпилированный код:
```bash
npm start
```

### Запуск обоих сервисов одновременно (для разработки)
Для удобства разработки можно запустить оба сервиса одновременно.
```bash
npm run start:dev
```

## API Endpoints

### user-service

Следующие эндпоинты доступны для `user-service`:

- `POST /api/create-user`: Создание нового пользователя. Требуется JSON в теле запроса с полями `name` и `email`.
- `PUT /api/update-user/:id`: Обновление данных пользователя по `id`. Требуется JSON в теле запроса с полями `name` и/или `email`.
- `GET /api/users`: Получение списка всех пользователей.

### user-history-service

Следующие эндпоинты доступны для `user-history-service`:

- `GET /api/user-actions`: Получение истории действий пользователя. Поддерживает параметры запроса `userId`, `page` и `pageSize` для фильтрации и пагинации.
