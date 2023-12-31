function getUsers() {
    var xhr = new XMLHttpRequest();

    // Открываем соединение, указывая метод и URL
    xhr.open('GET', '/user/all', true);
    
    // Устанавливаем обработчик события 'load' для успешного завершения запроса
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        // Успешный запрос. Обрабатывайте данные здесь.
        var data = JSON.parse(xhr.responseText);
        showPopup(data);
        console.log(data);
      } else {
        // Обработка ошибки
        console.error('Ошибка запроса: ' + xhr.statusText);
      }
    };
    
    // Устанавливаем обработчик события 'error' для ошибок сети
    xhr.onerror = function () {
      // Обработка ошибки
      console.error('Произошла ошибка сети');
    };
    
    // Отправляем запрос
    xhr.send();
}

function addStudent(userId) {
    let xhr = new XMLHttpRequest();
  
    xhr.open('PUT', '/user/add_student', true);
  
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        alert('Пользователь успешного добавлен');
      } else {
        console.error('Ошибка запроса: ' + xhr.statusText);
      }
    };
  
    xhr.onerror = function () {
      console.error('Произошла ошибка сети');
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json'); // Установка заголовка
  
    // Отправляем запрос с данными в формате JSON
    xhr.send(JSON.stringify({ userId: userId }));
  }