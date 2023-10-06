let current_question_index = 0;

function start(){
    refresh();
}

function refresh() {
    document.getElementById('question').innerHTML = get_question();

    document.getElementById('option-1').innerHTML = get_answer(0);
    document.getElementById('option-2').innerHTML = get_answer(1);
    document.getElementById('option-3').innerHTML = get_answer(2);
}

function answer(index){
    if (check_answer(index)){
        document.getElementById(`option-${index + 1}`).classList.add('.incorrect')
    }
    else {
        document.getElementById(`option-${index + 1}`).classList.add('.correct')
    }
}

function get_question(){
    return questions[current_question_index].question;
}

function get_answer(index){
    return questions[current_question_index].options[index];
}

function check_answer(index){
    return questions[current_question_index].correct_answer_index === index;
}

const questions = [
    {
        "question": "Что такое топографическая карта?",
        "options": [
            "Карта звездного неба",
            "Карта местности, отображающая рельеф и природные/искусственные объекты",
            "Кулинарный рецепт"
        ],
        "correct_answer_index": 1
    },
    {
        "question": "Какое масштабное обозначение говорит о том, что объекты на карте уменьшены в миллион раз по сравнению с реальностью?",
        "options": [
            "1:100",
            "1:1000",
            "1:1000000"
        ],
        "correct_answer_index": 2
    },
    {
        "question": "Что изображает контур на топографической карте?",
        "options": [
            "Точки с одинаковым атмосферным давлением",
            "Точки с одинаковой температурой",
            "Точки с одинаковой высотой"
        ],
        "correct_answer_index": 2
    },
    {
        "question": "Что такое изогонная линия на карте?",
        "options": [
            "Линия, соединяющая точки с одинаковым давлением",
            "Линия, соединяющая точки с одинаковой высотой",
            "Линия, соединяющая точки с одинаковым направлением магнитного поля"
        ],
        "correct_answer_index": 2
    }
    // ... Дополнительные вопросы ...
]

start();
}
