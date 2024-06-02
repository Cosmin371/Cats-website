const inputElement = document.querySelector('.js-input');
const tasksBlock = document.querySelector('.js-tasks');
const addButton = document.querySelector('.js-add-button');
const todoSection = document.getElementById('to-do');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

renderTasks();

/// adauga task nou
function addTask() {
    if (inputElement.value) {
        taskList.push({
            name: inputElement.value,
            checked: false
        });

        localStorage.setItem('taskList', JSON.stringify(taskList));
        inputElement.value = '';
        renderTasks();
    }
}

/// afisare taskuri
function renderTasks() {
    tasksBlock.innerHTML = '';
    taskList.forEach((task, i) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () => {
            taskList[i].checked = !taskList[i].checked;
            localStorage.setItem('taskList', JSON.stringify(taskList));
            renderTasks();
        });

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = task.checked ? `<del>${task.name}</del>` : task.name;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.splice(i, 1);
            localStorage.setItem('taskList', JSON.stringify(taskList));
            renderTasks();
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskName);
        taskElement.appendChild(deleteButton);
        tasksBlock.appendChild(taskElement);
    });
}

/// stil input box
inputElement.style.padding = '10px';
inputElement.style.marginBottom = '20px';
inputElement.style.border = '1px solid #ccc';
inputElement.style.borderRadius = '5px';
inputElement.style.fontSize = '1.2rem';
inputElement.style.width = '60%';

inputElement.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

addButton.addEventListener('click', addTask(event));

/// schimbare background random cu setTimeOut
const colors = [
  '#FFC0CB', // Pink
  '#FFD700', // Gold
  '#87CEEB', // Sky Blue
  '#FFA500', // Orange
  '#90EE90', // Light Green
];

function changeBackgroundRandomly() {

  const randomIndex = Math.floor(Math.random() * colors.length);
  todoSection.style.backgroundColor = colors[randomIndex];
  checkBackgroundColor(randomIndex);

  setTimeout(changeBackgroundRandomly, 10000);
}

function checkBackgroundColor(index) {
    const computedStyle = window.getComputedStyle(todoSection);
    const backgroundColor = computedStyle.backgroundColor;

    switch (index) {
      case 0: // Pink
          inputElement.placeholder = 'E o zi roz!';
          break;
      case 1: // Gold
          inputElement.placeholder = 'Auriu, la fel ca succesul tău!';
          break;
      case 2: // Sky Blue
          inputElement.placeholder = 'Cerul e senin!';
          break;
      case 3: // Orange
          inputElement.placeholder = 'Portocaliu vibrant!';
          break;
      case 4: // Light Green
          inputElement.placeholder = 'Verde și proaspăt!';
          break;
      default:
          inputElement.placeholder = 'Ce ai de facut astazi?';
          break;
    }
}

changeBackgroundRandomly();


/// Server side
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const responseMessage = document.getElementById('response-message');

  // Expresii regulate pentru validarea inputului
  const nameRegex = /^[a-zA-Z ]{2,30}$/; // Acceptă litere și spații, între 2 și 30 de caractere
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validare simplă pentru email

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obținem referințele la elemente
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Verificăm dacă elementele există în DOM
    if (!nameInput || !emailInput || !messageInput) {
      console.error('Form elements not found!');
      return;
    }

    // Obținem valorile și le validăm
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Resetăm mesajele de eroare
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    // Validare nume
    if (!nameRegex.test(nameValue)) {
      document.getElementById('name-error').textContent = 'Numele trebuie să conțină doar litere și să aibă între 2 și 30 de caractere.';
      return;
    }

    // Validare email
    if (!emailRegex.test(emailValue)) {
      document.getElementById('email-error').textContent = 'Introduceți o adresă de email validă.';
      return;
    }

    // Validare mesaj
    if (messageValue.length === 0) {
      document.getElementById('message-error').textContent = 'Introduceți un mesaj.';
      return;
    }

    const formObject = { name: nameValue, email: emailValue, message: messageValue };

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      if (response.ok) {
        const result = await response.json();
        responseMessage.textContent = 'Mesajul a fost trimis cu succes!';
        responseMessage.style.color = 'green';
      } else {
        responseMessage.textContent = 'A apărut o eroare. Încercați din nou.';
        responseMessage.style.color = 'red';
      }
    } catch (error) {
      responseMessage.textContent = 'A apărut o eroare. Încercați din nou.';
      responseMessage.style.color = 'red';
    }
  });
});
