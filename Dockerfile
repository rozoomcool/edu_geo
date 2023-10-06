# Используем официальный образ Node.js
FROM node:latest

# Устанавливаем MongoDB
RUN apt-get update && apt-get install -y mongodb

# Создаем директорию для приложения
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Открываем порт для приложения Node.js
EXPOSE 3000

# Запускаем MongoDB и приложение Node.js
CMD service mongodb start && node index.js