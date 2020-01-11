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
