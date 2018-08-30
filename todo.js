let tasks = [
	"Выучить JavaScript",
	"Выучить Angular 4",
	"Сходить на кофу"
];

let ul = document.querySelector('.list-group');
// получает текст 
// создает li, добавляет текст и создает class
// возвращает li
function listTemplate(task) {
	// создаем li
	let li = document.createElement('li');
	//добавляем текст в li
	li.textContent = task;
	//добавляем class
	li.className = 'list-group-item';

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

	return ul;
}

// добавляет новый task
function addList(list) {
	tasks.unshift(list);
	generateList(tasks);
}

generateList(tasks);
