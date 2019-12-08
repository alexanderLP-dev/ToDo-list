'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let newTask = {
		title: this.elements.title.value,
		status: 1 // 1 - todo, 2 - inprogress, 3 - done
	};

	let id = new Date().getTime();

	if (!newTask.title) {
		this.elements.title.parentNode.classList.add('has-error');
		return;
	}

	addTask(newTask, id);

	localStorage.setItem(id, JSON.stringify(newTask));

	$(modalAddTask).modal('hide');

	this.reset();
}

function deleteButtonHandler() {
	$(modalDeleteTask).modal('show');

	buttonConfirm.addEventListener('click', () => {
		let taskElement = this.parentNode.parentNode;

		let taskId = taskElement.dataset.id;

		localStorage.removeItem(taskId);

		taskElement.parentNode.removeChild(taskElement);

		$(modalDeleteTask).modal('hide');
	}, { once: true });
}

function editButtonHandler() {
	let taskElement = this.parentNode.parentNode;

	let taskId = taskElement.dataset.id;

	let task = JSON.parse(localStorage.getItem(taskId));

	for (let key in task) {
		formEditTask.elements[key].value = task[key];
	}

	formEditTask.elements.id.value = taskId;

	$(modalEditTask).modal('show');
}

function formEditTaskHandler(event) {
	event.preventDefault();

	let task = {
		title: this.elements.title.value,
		status: +this.elements.status.value,
	};

	let taskId = this.elements.id.value;

	let itemElement = document.querySelector(`[data-id="${taskId}"]`);
	itemElement.parentNode.removeChild(itemElement);

	addTask(task, taskId);

	localStorage.setItem(taskId, JSON.stringify(task));

	$(modalEditTask).modal('hide');
}

function modalAddTaskHandler() {
	formAddTask.elements.title.parentNode.classList.remove('has-error');
	formAddTask.elements.title.focus();
}
