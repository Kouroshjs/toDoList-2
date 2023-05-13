const $ = document;
const inputElem = $.getElementById('itemInput');
const addBtn = $.getElementById('addButton');
const clearButton = $.getElementById('clearButton')
let todosArray = []
let todoList = $.getElementById('todoList');

function addToLocal() {
  let newItemObj = {
    id: todosArray.length + 1,
    title: inputElem.value,
    complete: false, 
  }
  todosArray.push(newItemObj);
  localStorage.setItem('todos', JSON.stringify(todosArray));
  todosGenerator(todosArray)
  inputElem.value = ''
  inputElem.focus()
}

function todosGenerator(todosList) {
  todoList.innerHTML = ''
  todosList.forEach(function (item) {
    let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;
    newTodoLiElem = $.createElement('li');
    newTodoLiElem.className = 'uncompleted well';
    todoList.append(newTodoLiElem);

    newTodoLabalElem = $.createElement('label');
    newTodoLabalElem.innerHTML = item.title
    newTodoLiElem.append(newTodoLabalElem);

    newTodoCompleteBtn = $.createElement('button');
    newTodoCompleteBtn.className = 'btn btn-success'
    newTodoCompleteBtn.innerHTML = 'Complete'
    newTodoLiElem.append(newTodoCompleteBtn)
    newTodoCompleteBtn.setAttribute('onclick' , 'completeTodo('+ item.id +')')

    newTodoDeleteBtn = $.createElement('button');
    newTodoDeleteBtn.className = 'btn btn-danger'
    newTodoDeleteBtn.innerHTML = 'Delete'
    newTodoLiElem.append(newTodoDeleteBtn)
    newTodoDeleteBtn.setAttribute('onclick', 'deleteTodo('+ item.id +')');

    if (item.complete) {
      newTodoLiElem.className = 'completed well';
      newTodoCompleteBtn.innerHTML = 'UnComplete';


    }

  })
}

function deleteTodo(todoId) {
  JSON.parse(localStorage.getItem('todos')).forEach(function (todo) {
    if (todo.id === todoId) {
      todosArray.splice(todo, 1);
      localStorage.setItem('todos', JSON.stringify(todosArray))
      todosGenerator(todosArray)
    }
  })
}

function completeTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    todosArray.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.complete = !todo.complete;
        
      }
    })
  
    localStorage.setItem('todos', JSON.stringify(todosArray))
    todosGenerator(todosArray)
}


function checkLocal() {
  if (localStorage.getItem('todos')) {
    todosArray = JSON.parse(localStorage.getItem('todos'))
  } else {
    todosArray=[]
  }

  todosGenerator(todosArray)
}

function clearTodos () {
  todosArray = []
  todosGenerator(todosArray)
  // localStorage.clear()
  localStorage.removeItem('todos')
  clearButton.blur()
}
 

addBtn.addEventListener('click', addToLocal)

window.addEventListener('load', checkLocal)
clearButton.addEventListener('click', clearTodos)

inputElem.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    addToLocal()
  }
})