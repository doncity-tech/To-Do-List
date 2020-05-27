const qs = (element) => {
	return document.querySelector(element);
};
const qsAll = (element) => {
	return document.querySelectorAll(element);
};

// Remove extra whitespace
const cleanMyText = (text) => {
	let temp = [];
	text.split(' ').forEach((x) => {
		if (x) {
			temp.push(x);
		}
	});
	if (text && temp.join(' ')) {
		return temp.join(' ');
	}
};

const saveSuccessPage = () => {
	qs('.save-success').style.display = 'flex';
	setTimeout(() => {
		qs('.save-success').style.display = 'none';
	}, 1000);
};

// Get today's date
const todayTime = () => {
	const todayDate = new Date(); //return date object
	const today = todayDate.getDate();
	const month = todayDate.getMonth() + 1;
	const year = todayDate.getFullYear();
	const dayArray = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let date = dayArray[todayDate.getDay()] + ', ';
	date += today + '/' + month + '/' + year;
	return date;
};

// Get input from the user and display as ToDo list
const addTodoList = () => {
	let input = qs('.input input');
	// create Li element
	let node = document.createElement('LI');
	node.innerHTML = `<input type="button" value="X">
		<input type="checkbox">${input.value}`;

	//display the created TO-DO List
	let ul = document.querySelector('ul');
	ul.appendChild(node);
	input.value = '';
};

// Web Storages
const saveToWebStorage = (data) => {
	if (typeof Storage !== 'undefined') {
		localStorage.setItem('doncity-todo-list', data);
	} else {
		// document.querySelector('.storage-result').innerHTML =
		// "Your browser does not support Web Storage";
	}
};

const retriveWebStorage = () => {
	if (typeof Storage !== 'undefined') {
		if (localStorage.getItem('doncity-todo-list')) {
			return localStorage.getItem('doncity-todo-list');
		}
	} else {
		// document.querySelector('.storage-result').innerHTML =
		// "Your browser does not support Web Storage";
	}
};

// retrive style
const getStyle = (arg) => {
	let temp = arg.split(' ').find((x) => x === 'taskdone');
	return temp ? true : false;
};

// Retrive data if they exit in localstorage
if (retriveWebStorage()) {
	let ulInput = qs('[task-checked]');
	let getData = retriveWebStorage();
	getData
		.split(',')
		.reverse()
		.forEach((x) => {
			let li = document.createElement('li');
			if (getStyle(x)) {
				li.setAttribute('class', 'taskdone');
				li.innerHTML = `<input type="button" value="X">
			<input type="checkbox" checked>${x.split('taskdone')[0]}`;
			} else {
				li.innerHTML = `<input type="button" value="X">
			<input type="checkbox">${x}`;
			}
			ulInput.appendChild(li);
		});
}

// save to local storage;
const saveToLocalStorage = () => {
	let ulInput = qsAll('[task-checked] li');
	let list = [];
	ulInput.forEach((x) => {
		x.getAttribute('class') === 'taskdone'
			? list.push(cleanMyText(x.innerText) + ' taskdone')
			: list.push(cleanMyText(x.innerText));
	});

	if (typeof Storage !== 'undefined') {
		localStorage.setItem('doncity-todo-list', list);
		saveSuccessPage();
	} else {
		// document.querySelector('.storage-result').innerHTML =
		// "Your browser does not support Web Storage";
	}
	qs('.save').style.opacity = '0';
};

// compare localstorage and ul list
const compareStorage = () => {
	let localStorageList = [];
	let uiList = [];
	qsAll('[task-checked] li').forEach((y) => {
		if (y.getAttribute('class') === 'taskdone') {
			uiList.push(cleanMyText(y.innerText) + ' taskdone');
		} else {
			uiList.push(cleanMyText(y.innerText));
		}
	});
	if (retriveWebStorage()) {
		retriveWebStorage()
			.split(',')
			.reverse()
			.forEach((x) => {
				localStorageList.push(x);
			});
	}

	if (JSON.stringify(localStorageList) !== JSON.stringify(uiList)) {
		qs('.save').style.opacity = '1';
	} else {
		qs('.save').style.opacity = '0';
	}
};

// validate editing
const validateEdit = () => {
	let temp = qs('.editor input').value;
	let temp2;
	if (qs('#edited').getAttribute('class') === 'taskdone') {
		temp2 = `<input type="button" value="X">
		<input type="checkbox" checked>${cleanMyText(temp)}`;
	} else {
		temp2 = `<input type="button" value="X">
		<input type="checkbox">${cleanMyText(temp)}`;
	}
	qs('#edited').innerHTML = temp2;
	qs('#edited').removeAttribute('id');
	qs('.editor').style.display = 'none';
	compareStorage();
};

// Edit task
const editTask = (e) => {
	let temp1 = e.target.getAttribute('type') !== 'checkbox';
	let temp2 = e.target.getAttribute('type') !== 'button';
	if (temp1 && temp2) {
		qs('.editor').style.display = 'flex';
		qs('.editor input').focus(); // focus the input
		let temp3 = cleanMyText(e.target.innerText);
		qs('.editor input').value = ''; // set the cursor on the focus input
		qs('.editor input').value = temp3;
		e.target.setAttribute('id', 'edited');
	}
};

// checkbox and delete task function
const checkOrDeleteTask = (e) => {
	editTask(e);
	if (e.target.getAttribute('type') === 'checkbox') {
		let check = e.target.parentNode;
		if (check.getAttribute('class') === 'taskdone') {
			check.setAttribute('class', ' ');
		} else {
			check.setAttribute('class', 'taskdone');
		}
	} else if (e.target.getAttribute('type') === 'button') {
		const taskParent = document.querySelector('[task-checked]');
		taskParent.removeChild(e.target.parentNode);
	}
	compareStorage();
};

// clear all task on the UI
const clearAllTask = () => {
	const taskParent = document.querySelector('[task-checked]');
	const taskChild = document.querySelectorAll('[task-checked] li');
	const len = taskChild.length;
	for (let i = 0; i < len; i++) {
		taskParent.removeChild(taskChild[i]);
	}
	qs('.sidemenu').style.display = 'none';
	localStorage.removeItem('doncity-todo-list');
	compareStorage();
};

// Hide caution
window.addEventListener('load', () => {
	setTimeout(() => {
		qs('.caution').style.display = 'none';
	}, 3000);
});

// Javascript interaction with DOM
const uiInteraction = () => {
	// Add task to UI
	const add = qs('.input button');
	add.addEventListener('click', () => {
		if (qs('.input input').value.length != 0) {
			addTodoList();
			compareStorage();
		}
	});

	qs('.input input').addEventListener('keyup', (e) => {
		e.preventDefault();
		if (e.keyCode === 13 && qs('.input input').value.length != 0) {
			addTodoList();
			compareStorage();
		}
	});

	const checkOrDelete = qs('[task-checked]');
	if (checkOrDelete) {
		checkOrDelete.addEventListener('click', (e) => {
			checkOrDeleteTask(e);
		});
	}

	qs('.save').addEventListener('click', () => {
		if (qs('.save').style.opacity === '1') {
			saveToLocalStorage();
		}
	});

	qs('.settings').addEventListener('click', () => {
		qs('.sidemenu').style.display = 'block';
	});

	qs('.close-menu').addEventListener('click', () => {
		qs('.sidemenu').style.display = 'none';
	});

	qs('.clear-tasks').addEventListener('click', clearAllTask);

	qs('.help').addEventListener('click', () => {
		qs('.sidemenu').style.display = 'none';
		qs('.about').style.display = 'flex';
		qs('.copy-right').style.display = 'block';
	});

	qs('.about button').addEventListener('click', () => {
		qs('.about').style.display = 'none';
		qs('.copy-right').style.display = 'none';
	});

	qsAll('.editor button')[0].addEventListener('click', () => {
		qs('.editor').style.display = 'none';
	});

	qsAll('.editor button')[1].addEventListener('click', () => {
		validateEdit();
	});

	qs('.editor input').addEventListener('keyup', (e) => {
		if (e.keyCode === 13) {
			validateEdit();
		}
	});
};
uiInteraction();
