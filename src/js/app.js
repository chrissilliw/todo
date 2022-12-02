const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todosList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.selected-todos');

let todos = [];

todoForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    
    addTodo(todoInput.value);

});


function addTodo(todoValue){
    
    if(todoValue !== ''){
        
        const todo ={
            id: Date.now(),
            name : todoValue,
            completed : false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = ''; 
    }
}

function displayTodos(todos){
    todosList.innerHTML = '';

    todos.forEach((todo) => {
        let checked = todo.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.classList.add("todo-item");
        li.setAttribute('data-key', todo.id);

        if(todo.completed == true){
            li.classList.add('checked');
        }

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add("checkbox");
        li.appendChild(checkbox);

        checkbox.setAttribute(checked, checked);

        let todoTitle = document.createElement('p');
        todoTitle.classList.add("todo-title");
        todoTitle.innerHTML = todo.name;
        li.appendChild(todoTitle);

        todosList.append(li);
    });
};

function addToLocalStorage(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos(todos);
}

function getFromLocalStorage(){
    const reference = localStorage.getItem('todos');

    if(reference){
        todos = JSON.parse(reference);
        displayTodos(todos);
    }
}

function toggle(id){
    todos.forEach((todo) => {
        if(todo.id === parseInt(id)){
            todo.completed = !todo.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id){

}

getFromLocalStorage();

todosList.addEventListener('click', (event) => {

    const target = event.target;
    const parentElement = target.parentNode;

    if(!parentElement.classList.contains('todo-item')) return;

        toggle(event.target.parentElement.getAttribute('data-key'));
    
});

//Sort functions 
// filterOption.addEventListener('click', (event) => {
//     const todos = todosList.childNodes;

//     todos.forEach( (todo) => {
//         switch (event.target.value){
//             case "date":

//                 break;
//             case "completed":
//                 //if(todo.classList.contains('completed')){
//                     console.log("Done");
//                 //} 
//                 break;
//             case "text-order": 
//                 //if(todo.classList.contains('text-order')){
//                     //displayTodos();
//                     console.log(todos).sort(sortByText);
//                // }
//                 break;

//         }
//     });
// });

// function sortByText(a, b){
//     if(a.name > b.name){
//         return 1; 
//     } if(b.name < a.name){
//         return -1;
//     }else{
//         return 0;
//     }
// }