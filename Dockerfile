# Используем базовый образ с Node.js
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Открываем порт, который будет использоваться приложением
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "index.js"]