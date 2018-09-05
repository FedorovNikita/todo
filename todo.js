let tasks = [
	"Выучить JavaScript",
	"Выучить Angular 4",
	"Сходить на кофу"
];

let ul = document.querySelector('.list-group');
let deleteBtns = document.getElementsByClassName('delete-item');
// получает текст 
// создает li, добавляет текст и создает class
// возвращает li
function listTemplate(task) {
	// создаем li
	let li = document.createElement('li');
	//добавляем текст в li
	li.textContent = task;
	//добавляем class
	li.className = 'list-group-item d-flex align-items-center';

	// создаем тег i с class
	let Idelete = document.createElement('i');
	Idelete.className = 'fas fa-trash-alt delete-item ml-auto';

	// добавляем иконку в ли
	li.appendChild(Idelete);
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
	tasks.unshift(list);
	generateList(tasks);
}

// навешиваем событие при каждом клике на корзину
/* function setDeleteEvent() {
	for( let i = 0; i < deleteBtns.length; i++) {
		deleteBtns[i].addEventListener('click', function (e) {
			console.log('click');
		})
	}	
} */
function deleteListItem(target) {
	//нашли кого удалять li
	let parent = target.closest('li');
	// получаем текстовое содержимое li
	let text = parent.textContent;
	// находим индекс содержимого в массиве
	let index = tasks.indexOf(text);
	// удаляем этот текст из массива
	tasks.splice(index, 1);
	// удаляем li из разметки
	parent.remove();
}

// удаляем элементы при событие
ul.addEventListener('click', function(e) {
	if ( e.target.classList.contains('delete-item')) {
		deleteListItem(e.target);
	}
})

generateList(tasks);


console.log(deleteBtns);


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