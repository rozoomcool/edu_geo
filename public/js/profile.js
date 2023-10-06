const edit_button_btn = `
<button onclick="edit()">Редактировать</button>
`

const save_buttons_btn = `
<button class="dangerous-button" onclick="cancel()">Отмена</button>
<button onclick="save()">Сохранить</button>
`

const get_infos = () => document.querySelectorAll('.td-info');
const get_inputs = () => document.querySelectorAll('.form-input');

function edit(){
    const infos = get_infos();
    const inputs = get_inputs();

    for (let i = 0; i < infos.length; i++){
        infos[i].style.display = 'none';
        inputs[i].style.display = 'block';
        inputs[i].value = infos[i].innerHTML;
    }

    const buttons_element = document.getElementById('buttons-group');
    buttons_element.innerHTML = save_buttons_btn;
}

function save(){
    const infos = get_infos();
    const inputs = get_inputs();

    for (let i = 0; i < infos.length; i++){
        infos[i].style.display = 'block';
        inputs[i].style.display = 'none';
        console.log(infos[i].value);
        infos[i].innerHTML = inputs[i].value;
    }

    const buttons_element = document.getElementById('buttons-group');
    buttons_element.innerHTML = edit_button_btn;
}

function cancel(){
    const infos = get_infos();
    const inputs = get_inputs();

    for (let i = 0; i < infos.length; i++){
        infos[i].style.display = 'block';
        inputs[i].style.display = 'none';
    }

    const buttons_element = document.getElementById('buttons-group');
    buttons_element.innerHTML = edit_button_btn;
}

