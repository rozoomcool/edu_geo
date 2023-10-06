function showPopup(data) {
    let popup = document.getElementById('popup');
    popup.style.display = 'flex';

    let content = document.querySelector('.pop-content');

console.log(content);
    for(let user of data){
        console.log(data);
        let newDiv = document.createElement('div');
        newDiv.classList.add('popup-list-elem');

        // Добавляем содержимое в новый div (по желанию)
        newDiv.innerHTML = `${user.firstname} ${user.lastname}  <span onclick="addStudent(${user.id})">Добавить</span>`;
        content.appendChild(newDiv);
    }
    
}

function closePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
}