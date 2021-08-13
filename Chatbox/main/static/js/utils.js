function showMyMessage(message) {
    const divItem = document.createElement('div');
    divItem.setAttribute('class', 'my-chat');
    divItem.innerHTML = message;
    document.getElementById('main_chats').append(divItem)
    scrollDownChatWindow();
}
function showFriendMessage(message) {
    const divItem = document.createElement('div');
    divItem.setAttribute('class', 'client-chat');
    divItem.innerHTML = message;
    document.getElementById('main_chats').append(divItem)
    scrollDownChatWindow();
    }

function scrollDownChatWindow() {
    const chatWindow = document.getElementsByClassName('chats');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

const client = new XMLHttpRequest();

client.onreadystatechange = () => {
    if (client.readyState == 4 && client.status == 200) {
        message = client.responseText;
        console.log('Recive: ' + message);
        showFriendMessage(message);
    }
}

document.getElementById('send-btn').onclick = () => {
    const toSend = {"content" : document.getElementById('typing').value}
    const jsonString = JSON.stringify(toSend);
    if (toSend.content) {
        client.open('POST', '/chat', true);
        client.setRequestHeader('Content-Type', 'application/json');
        client.send(jsonString);

        console.log(jsonString);
        document.getElementById('typing').value = '';
        showMyMessage(toSend.content)
        scrollDownChatWindow()
    }
}