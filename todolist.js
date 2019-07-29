
// Get today's date
const todayTime = () => {
	const todayDate = new Date(); //return date object
	const today = todayDate.getDate(); 
	const month = todayDate.getMonth() + 1;
	const year = todayDate.getFullYear();
	const dayArray = [
		"Sunday","Monday","Tuesday","Wednesday",
		"Thursday","Friday","Saturday"
	];
	let date = dayArray[todayDate.getDay()] + ", ";
	date += today + "/" + month + "/" + year;
	return date;
}

// Get input from the user and display as ToDo list
const addTodoList = (e)=> {
	let input = document.querySelector('[type="text"]');
	if(input.value.length != 0 && (e.target.key === "Enter" || input)){
		console.log(e.target);
		// create Li element
		let node = document.createElement('LI');
		
		// create delete BUTTON element
		let deleteNode = document.createElement('INPUT');
		let deleteNodeAtt = document.createAttribute('type');
		let valueNodeAtt = document.createAttribute('value');
		deleteNodeAtt.value = "button";
		valueNodeAtt.value = "X";
		deleteNode.setAttributeNode(deleteNodeAtt);
		deleteNode.setAttributeNode(valueNodeAtt);
		node.appendChild(deleteNode);
		
		// create checkbox INPUT element
		let checkNode = document.createElement('INPUT');
		let nodeAtt = document.createAttribute('type');
		nodeAtt.value = "checkbox"; 
		checkNode.setAttributeNode(nodeAtt);
		node.appendChild(checkNode);
		
		let textNode = document.createTextNode(input.value);
		node.appendChild(textNode);
		
		//display the created TO-DO List
		document.querySelector('ul').appendChild(node);
		input.value = "";
	}
	e.preventDefault();
}

// checkbox and delete task function
const checkOrDeleteTask = (e) => {
	if(e.target.getAttribute("type") == "checkbox"){
		let check = e.target.parentNode;
		if(check.getAttribute("class") == 'taskstyle'){
			check.setAttribute('class', ' ');
		}
		else{
			check.setAttribute('class', 'taskstyle');
		}
	}
	else if(e.target.getAttribute("type") == "button"){
		const taskParent = document.querySelector('[task-checked]');
		taskParent.removeChild(e.target.parentNode);
	}
}

// clear all task on the UI
const clearAllTask = () => {
	const taskParent = document.querySelector('[task-checked]');
	const taskChild = document.querySelectorAll('li');
	const len = taskChild.length;
	for (let i = 0; i < len; i++){
		taskParent.removeChild(taskChild[i]);
	}	
}

// Javascript interaction with DOM
const uiInteraction = () => {
	document.querySelector('[today-date]').innerHTML = todayTime();
	
	const add = document.querySelector('[type="submit"]');
	add.addEventListener('click', addTodoList);
	
	const clearTask = document.querySelector('[clear-task]');
	clearTask.addEventListener('click', clearAllTask);
	
	const checkOrDelete = document.querySelector('[task-checked]');
	if (checkOrDelete){
		checkOrDelete.addEventListener('click', checkOrDeleteTask);
	}
}
uiInteraction();
