//Register Service worker
if('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/doncity-todo-sw.js')
		.then(reg => {
			console.log('Registered!', reg);
		})
		.catch(err => {
			console.log('Registration Failed: ', err);
		});
	});
}


// const myTask = () => {
// 	const aboutMe = {
//     full_name : "Princewill Opara",
//     HNG_ID : "HNG-01654",
//     email : "doncitymail@gmail.com",
//     language : "Javascript"
// 	}
// 	return `Hello World, this is ${aboutMe.} with HNGi7 ID ${aboutMe.HNG_ID} using ${aboutMe.language} for stage 2 task`;
// }

// myTask();
