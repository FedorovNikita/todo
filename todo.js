
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let notificationAlert = document.querySelector('.notification-alert')


function generateId() {
	let id = '';
	let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	
	for (let i = 0; i < 15; i++) {
		let position = Math.floor(Math.random() * words.length);
		id += words[position];
	}

	return id;
}

// получает текст 
// создает li, добавляет текст и создает class
// возвращает li
function listTemplate(task) {
	// создаем li
	let li = document.createElement('li');
	//добавляем class
	li.className = 'list-group-item d-flex align-items-center';
	li.setAttribute('data-id', task.id)
	let span = document.createElement('span');
	//добавляем текст в li
	span.textContent = task.text;
	// создаем тег i с class
	let iDelete = document.createElement('i');
	iDelete.className = 'fas fa-trash-alt delete-item ml-4';
	let iEdit = document.createElement('i');
	iEdit.className = 'fas fa-edit edit-item ml-auto';
	
	// добавляем иконки в ли и span
	li.appendChild(span);
	li.appendChild(iEdit);
	li.appendChild(iDelete);
		
	return li;
}

// очищает список tasks
function clearList() {
	ul.innerHTML = '';
}

// генерирует список тасков
function generateList(tasksArray) {
	clearList();
	
	for (let i = 0; i < tasks.length; i++) {
		ul.appendChild(listTemplate(tasks[i]));
	}

	/* setDeleteEvent(); */

	return ul;
}

// добавляет новый task
function addList(list) {
	let newTask = {
		id: generateId(),
		text: list
	}
	tasks.unshift(newTask);
	//generateList(tasks);
	// чтобы добавлять по одной и не генерировать по новой li
	// insertAdjacentElement приниак5т два аргумента 1. это позиция, на которую нужно устаровить 2. элемент, который нужно установить
	ul.insertAdjacentElement('afterbegin',listTemplate(newTask));
	// Add to localStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteListItem(id) {

	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === id) {
			// удаляем этот текст из массива
			tasks.splice(i, 1);
			break;
		}
	}

	// Update to localStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));

	message({
		text: 'Task delete success',
		cssClass: 'alert-warning',
		timeout: 4000
	});
}

function editListItem(id, newValue) {
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === id) {
			// удаляем этот текст из массива
			tasks[i].text = newValue;
			break;
		}
	}

	// Update to localStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));

	message({
		text: 'Task updated success',
		cssClass: 'alert-success',
		timeout: 4000
	});
}

function message(settings) {
	notificationAlert.classList.add(settings.cssClass);
	notificationAlert.textContent = settings.text;
	notificationAlert.classList.add('show');

	setTimeout(function() {
		notificationAlert.classList.remove('show');
		notificationAlert.classList.remove(settings.cssClass);
	}, settings.timeout)
}

// удаляем элементы при событие
ul.addEventListener('click', function(e) {
	// delete list item
	if (e.target.classList.contains('delete-item')) {
		//нашли кого удалять li
		let parent = e.target.closest('li');
		let id = parent.dataset.id;
		deleteListItem(id);
		// удаляем li из разметки
		parent.remove();
	} else if (e.target.classList.contains('edit-item')) {
		e.target.classList.toggle('fa-save');
		let id = e.target.closest('li').dataset.id;
		let span = e.target.closest('li').querySelector('span');

		if (e.target.classList.contains('fa-save')) {
			span.setAttribute('contenteditable', true);
			span.focus();
		} else {
			span.setAttribute('contenteditable', false);
			span.blur();
			editListItem(id, span.textContent);
		}
	}
});

form.addEventListener('submit', function(e) {
	//прекращение стандартного действия (то что тут было сразу пропадало)
	e.preventDefault();
	// сделаем проверку, чтобы не добавлялось пустое значение
	if (!inputText.value) {
		// show error
		inputText.classList.add('is-invalid');
	} else {
		// удаляем класс is-invalid, если он был, чтобы ниже не был текс please, enter...
		inputText.classList.remove('is-invalid');

		/* // удаляем класс, чтобы появлось сообщение после удачного добавление task
		// не очень хорошее решение...
		messageAdd[0].classList.remove('invalid-feedback'); */
		
		//получать текст из инпута inputText.value
		//и чтобы добавить можно просто вызывать функцию и передавать ей это текст
		//addList(inputText.value); // но этот у нас генерирует все элементы заного
		addList(inputText.value);
		// сбрасываем красное поле с инпуда
		form.reset();
		/* setTimeout(function() {
			messageAdd[0].classList.add('invalid-feedback');
		}, 2000) */
	}

	 
})

inputText.addEventListener('keyup', function (e) {
	if (inputText.value) {
		inputText.classList.remove('is-invalid');
	}
})

generateList(tasks);

/* // находим кнопку
let btn = document.querySelector('.clear-btn');
// навешиваем событие на кнопку 
btn.addEventListener("click", function(e){
	console.log(e);
});
// можно с функцие без колбека
function onClick2(e){
	console.log('Click 2');
}
// вторым аргументом в событие передаем функцию 
btn.addEventListener('click', onClick2);
// удаляем событие 
btn.removeEventListener('click', onClick2);
 */


// 6 занятие собые
/* let body = document.body;
let taskWrap = document.querySelector('.task-wrap');
let container = document.querySelector('.container');
let listCard = document.querySelector('.list-card');
let cardBody = document.querySelector('.list-card .card-body');
let listGroup = document.querySelector('.list-group');

// погружение события
listGroup.addEventListener('click', function (e) {

	console.log('list-group');
}, true);

cardBody.addEventListener('click', function (e) {
	console.log('.list-card .card-body');
}, true);

listCard.addEventListener('click', function (e) {
	
	console.log('.list-card');
}, true);

container.addEventListener('click', function (e) {
	console.log('.container');
}, true);

taskWrap.addEventListener('click', function (e) {
	console.log('.tasks-wrap');
}, true);

body.addEventListener('click', function (e) {
	console.log('body');
}, true); */



// всплытие события
/* listGroup.addEventListener('click', function (e) {
	// отменили всплытие, чтобы события не сработали у родителей
	// e.stopImmediatePropagation();
	console.log('list-group');
});

cardBody.addEventListener('click', function (e) {
	console.log('.list-card .card-body');
});

listCard.addEventListener('click', function (e) {
	
	console.log('.list-card');
});

container.addEventListener('click', function (e) {
	console.log('.container');
});

taskWrap.addEventListener('click', function (e) {
	console.log('.tasks-wrap');
});

body.addEventListener('click', function (e) {
	console.log('body');
}); */

