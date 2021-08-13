const socket = io();

socket.on('connect', () => {
    console.log('Connected!');
})

socket.on('message', (data) => {
    console.log(data)
    showFriendMessage(data)
})

document.getElementById('send-btn').onclick = () => {
    const toSend = {"content" : document.getElementById('typing').value}
    if (toSend.content) {
        socket.send(toSend.content);
        console.log(toSend);
        document.getElementById('typing').value = ''; //clear textarea
        showMyMessage(toSend.content)
    }
}