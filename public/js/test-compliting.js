function checkAnswer(isCorrect) {
    // Получаем все кнопки ответа
    const buttons = document.querySelectorAll('.answer-button');

    // Блокируем кнопки после ответа пользователя
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Проверяем ответ пользователя и устанавливаем соответствующий класс
    if(isCorrect) {
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
    }
}
