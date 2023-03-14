const addTask = document.querySelector('.fa-plus');
const todoInput = document.querySelector('.add-task input');
const todoList = document.querySelector('.to-do');
const cardContainer = document.getElementById('card-container');

addTask.addEventListener('click', addCard);
document.querySelector('.add-task').addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        addCard();
    }
})

window.addEventListener('load', function() {
    loadCards();
});

function addCard() {
    console.log('card added');

    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const now = new Date();
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'fa-solid fa-trash';

        card.appendChild(title);
        card.appendChild(deleteButton);
        cardContainer.insertBefore(card, cardContainer.firstChild);
        todoInput.value = '';

        deleteButton.addEventListener('click', function() {
            /*const result = confirm('Are you sure you want to delete this task?');*/
            const result = 1;
            if (result) {
                card.parentNode.removeChild(card);

                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const index = tasks.findIndex(task => task.text === todoText);
                if (index !== -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
        });

        card.addEventListener('click', function() {
            console.log('change color');
            if (card.style.background === 'linear-gradient(90deg, #3c3c3cb8, #70ba77, #30be2384)') {
                card.style.background = 'linear-gradient(90deg, #968383b1, #d69d9d, #ff7c7c)';
            } else {
                card.style.background = 'linear-gradient(90deg, #3c3c3cb8, #70ba77, #30be2384)';
            }
        });

        setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.unshift({ text: todoText, time: now });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadCards() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let i = tasks.length - 1; i >= 0; i--) {
      const card = createCard(tasks[i].text,);
      cardContainer.appendChild(card);
    }
}

function createCard(text) {
    const card = document.createElement('div');
    card.className = 'card';
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = text;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'fa-solid fa-trash';

    card.appendChild(title);
    card.appendChild(deleteButton);
    cardContainer.insertBefore(card, cardContainer.firstChild);

    todoInput.value = '';

    deleteButton.addEventListener('click', function() {
        /*const result = confirm('Are you sure you want to delete this task?');*/
        const result  = 1;
        if (result) {
            card.parentNode.removeChild(card);

            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = tasks.findIndex(task => task.text === text);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });

    card.addEventListener('click', function() {
        console.log('change color');
            if (card.style.background === 'linear-gradient(90deg, #3c3c3cb8, #70ba77, #30be2384)') {
                card.style.background = 'linear-gradient(90deg, #968383b1, #d69d9d, #ff7c7c)';
            } else {
                card.style.background = 'linear-gradient(90deg, #3c3c3cb8, #70ba77, #30be2384)';
            }
    });

    setTimeout(function() {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 10);

    return card;
}