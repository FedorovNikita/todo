let tasks = [
	"Выучить JavaScript",
	"Выучить Angular 4",
	"Сходить на кофу"
];

let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
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
	//generateList(tasks);
	// чтобы добавлять по одной и не генерировать по новой li
	// insertAdjacentElement приниак5т два аргумента 1. это позиция, на которую нужно устаровить 2. элемент, который нужно установить
	ul.insertAdjacentElement('afterbegin',listTemplate(list));

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
});

form.addEventListener('submit', function(e) {
	//прекращение стандартного действия (то что тут было сразу пропадало)
	e.preventDefault();
	if ( !inputText.value ) {
		// чтобы не добавлялись пустые элементы в наш список
		// is-invalid это класс из бутстрапаы
		inputText.classList.add('is-invalid');
	} else {
		// удаляем класс, чтобы его точно не было
		inputText.classList.remove('is-invalid');
		//получать текст из инпута inputText.value
		//и чтобы добавить можно просто вызывать функцию и передавать ей это текст
		//addList(inputText.value); // но этот у нас генерирует все элементы заного
		addList(inputText.value);
		// теперь, если мы добавляем пустой элемент, будет "предупреждение", и когда мы добавляем новый элемент, после так и остается в красном фоне
		// поэтому нам нужно обнулить состояние формы
		form.reset();

	}
	
});

// keyup когда мы начинаем вводить в инпут
// когда мы начинаем что-то вводить в инпут ошибка пропадает
inputText.addEventListener('keyup', function(e) {
	if ( inputText.value ) {
		inputText.classList.remove('is-invalid');
	}
});

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