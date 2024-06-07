const inputElement = document.querySelector('.js-input');
const tasksBlock = document.querySelector('.js-tasks');
const addButton = document.querySelector('.js-add-button');
const todoSection = document.getElementById('to-do');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
const inputButtonBundle = document.getElementById('input-button-bundle');
const todoh1 = document.getElementById('to-do-h1'); 

todoSection.style.padding = '30px';
todoh1.style.fontSize = '2.5rem';
todoh1.style.textAlign = 'center';
todoh1.style.margin = '0';

// Function to add a new task
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

// Function to render tasks
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

        // Apply styles
        taskElement.style.display = 'flex';
        taskElement.style.alignItems = 'center';
        taskElement.style.padding = '10px';
        taskElement.style.border = '1px solid #ccc';
        taskElement.style.borderRadius = '10px';
        taskElement.style.marginBottom = '10px';
        taskElement.style.backgroundColor = '#fff';

        checkbox.style.marginRight = '15px';

        taskName.style.flex = '1';
        taskName.style.fontSize = '1.2rem';

        deleteButton.style.padding = '5px 10px';
        deleteButton.style.backgroundColor = '#ff4c4c';
        deleteButton.style.color = '#fff';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '5px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.transition = 'background-color 0.3s ease';

        deleteButton.addEventListener('mouseenter', () => {
            deleteButton.style.backgroundColor = '#ff1c1c';
        });
        deleteButton.addEventListener('mouseleave', () => {
            deleteButton.style.backgroundColor = '#ff4c4c';
        });
    });
}

inputButtonBundle.style.display = 'flex';
inputButtonBundle.style.alignItems = 'center';
inputButtonBundle.style.justifyContent = 'center';
inputButtonBundle.style.gap = '10px';
inputButtonBundle.style.marginBottom = '25px';

// Apply styles to input box
inputElement.style.padding = '15px';
inputElement.style.border = '2px solid #cccccc';
inputElement.style.borderRadius = '10px';
inputElement.style.fontSize = '1.5rem';
inputElement.style.width = '100%';

// Apply styles to add button
addButton.style.padding = '15px 25px';
addButton.style.width = '20%';
addButton.style.backgroundColor = '#333';
addButton.style.color = '#fff';
addButton.style.border = 'none';
addButton.style.borderRadius = '10px';
addButton.style.fontSize = '1.5rem';
addButton.style.cursor = 'pointer';
addButton.style.transition = 'background-color 0.3s ease';

addButton.addEventListener('mouseenter', () => {
    addButton.style.backgroundColor = '#555';
});
addButton.addEventListener('mouseleave', () => {
    addButton.style.backgroundColor = '#333';
});

// Initial render
renderTasks();

// Event listener for add button
addButton.addEventListener('click', addTask);

inputElement.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

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
          inputElement.placeholder = 'Fa curat la pisica!';
          break;
      case 1: // Gold
          inputElement.placeholder = 'Curata litiera!';
          break;
          case 2: // Sky Blue
          inputElement.placeholder = 'Perie pisica!';
          break;
      case 3: // Orange
          inputElement.placeholder = 'Joaca-te cu pisica!';
          break;
      case 4: // Light Green
          inputElement.placeholder = 'Mergi la veterinar!';
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
  const nameRegex = /^[a-zA-ZșțăîâȘȚĂÎÂ \-]{2,30}$/;
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
      document.getElementById('name-error').textContent = 'Numele poate să conțină doar litere românești, liniuta "-" și să aibă între 2 și 30 de caractere.';
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

    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    let day = String(currentDate.getDate()).padStart(2, '0');
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // Format the date as DD/MM/YYYY - HH:MM
    let formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
    const formObject = { name: nameValue, email: emailValue, message: messageValue, date: formattedDate };
    // console.log(formObject);
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
