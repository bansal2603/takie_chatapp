const socket = io('http://localhost:8000') 

const form = document.getElementById("sendcontainer");
const messageinp = document.getElementById("sendinput");
const divcontainer = document.querySelector(".container")

const sound = new Audio('notification.mp3')
const append = (message,position)=>{
    const newele = document.createElement('div');
    newele.innerText = message;
    newele.classList.add('message');
    newele.classList.add(position);
    divcontainer.append(newele);
    if(position =='left')
    {
        sound.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault;
    const message = messageinp.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message)
    messageinp.value = '';
})

const name = prompt("enter your name to join");

socket.emit('new-user-joined', name);
socket.on('user-joined',name=>{
    append(`${name} has joined the chat`,'left')
})


socket.on('recieved',data=>{
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('disconnected',name=>{
    append(`${name} has left the chat`,'left')
})