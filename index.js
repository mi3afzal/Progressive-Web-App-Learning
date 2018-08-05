
console.log('Hello World');
var server_url = '/';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function (registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	}).catch(function (err) {
		// registration failed :(
		console.log('ServiceWorker registration failed: ', err);
	});
}

// take example user data from
// https://jsonplaceholder.typicode.com/users 
function getData(){
	console.log('Get data function called.');
	fetch(server_url+'users.json').then(function(responce){
		return responce.json();
	}).then(function(users){
		console.log(users);
	}).catch(function(error){
		console.log('Not Working. ', error);
	})
}