const socket = io('https://vipin-chat-server.herokuapp.com');
const messageContainer = document.getElementById('chat-messages');
const messageForm = document.getElementById('chat-form');
const messageElement = document.getElementById('chat-input');

const name = prompt('what is your name?');
appendMessage("<span>You</span> joined");
socket.emit('new-user', name);

socket.on('user-connected', name => {
	appendMessage(`<span>${name}</span> connected`);
});
socket.on('user-disconnected', name => {
	if(name) {
		appendMessage(`${name} disconnected`);
	}
});
socket.on('chat-message', data => {
	appendMessage(`<span>${data.name}:</span> ${data.message}`);
});
messageForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = messageElement.value;
	appendMessage(`<span>You:</span> ${message}`);
	socket.emit('send-chat-message', message);
	messageElement.value = '';
});


function appendMessage(message) {
	const messageElement = document.createElement('div');
	messageElement.innerHTML = message;
	messageContainer.append(messageElement);
}