// DOM elements
const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todos');

let todos = []; 
let id = 0; 

// Eventlyssnare för klassen 
addBtn.addEventListener('click', addTodo);

// CREATE
function addTodo() {
    const text = input.value.trim();

    if (text !== "") {
        // Create a new task object
        const newTodo= {
            id: id++, // Auto-increment task ID
            task: text,
            completed: false
        };

        // Add the new task to the tasks array
        todos.push(newTodo);

        // Clear the input field
        input.value = '';

        // Render the updated task list
        renderList();
        console.log(todos);

    } else {
        alert("Skriv i textrutan.");
    }
}



// Renderar listan till DOM:en
function renderList() {

    todoList.innerHTML = ''; 
    let htmlString = "";

    todos.forEach(function(todo) {

        const completedClass = todo.completed ? 'done' : '';

        const html = `
            <li data-id="${todo.id}">
                <span class="todoText ${completedClass}">${todo.task}</span>
                <button class="deleteBtn">X</button>
            </li>
        `;
        htmlString += html;
    });

    todoList.innerHTML = htmlString;
}




// Event delegation
todoList.addEventListener('click', function(event) {

   if(event.target.classList.contains("todoText")) {

    //Närmst li-parent 
    const listItem = event.target.closest('li');
    const id = parseInt(listItem.getAttribute("data-id"));


       // Uppdatera todo-arrayen med vilket id som ska togglas
       toggleTodoCompletion(id);


      // Ändra UI för span som vi klickar på
       event.target.classList.toggle("done");
      
    }

    if (event.target.classList.contains("deleteBtn")) {
        // Find the closest li parent
        const listItem = event.target.closest('li');
        const id = parseInt(listItem.getAttribute("data-id"));

        // Delete the todo item
        deleteTodo(id);
    }
});


// UPDATE
function toggleTodoCompletion(id) {

    // Ändrar i arrayen
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].completed = !todos[i].completed;
            break; 
        }
    }
    console.log(todos);
    renderList()
}



// Function to delete a task by its ID
function deleteTodo(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            break;
        }
    }
    renderList();
}




