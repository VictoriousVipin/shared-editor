const socket = io("https://vipin-chat-server.herokuapp.com");
const area = document.getElementById("shared-editor-textarea");

area.addEventListener("change", (e) => {
  socket.emit("content-add", e.target.value);
});
area.addEventListener("keyup", (e) => {
  socket.emit("content-add", e.target.value);
});

socket.on("content-update", (content) => {
  area.value = content;
});
