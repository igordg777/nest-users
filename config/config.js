// require('dotenv').config();  // Загружает переменные из .env файла
require('dotenv').config({ path: '.development.env' }); // Загружает переменные из .development.env файла
// require('dotenv').config({ path: '.production.env' }); // Загружает переменные из .development.env файла
// Для миграций и получения переменных окружения дополнительно к cross - env добавлен пакет dot - env
// Миграции выполняются командой npx sequelize-cli db:migrate --config=config/config.js
// Отмена миграции командой npx sequelize-cli db:migrate:undo --config=config/config.js (отменяется только последняя миграции, по очереди можно дойти до нужной или отменить все, либо отменить все можно одно командой сразу npx sequelize-cli db:migrate:undo:all --config=config/config.js)

console.log({ test_env: process.env.POSTGRES_PASSWORD });
console.log({ test_env2: typeof process.env.POSTGRES_PASSWORD });

module.exports =
{
  "development": {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
  "test": {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
  "production": {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    "dialect": "postgres"
  }
}