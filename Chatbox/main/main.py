from flask import Flask, request, render_template, redirect, Response, jsonify
from werkzeug import debug
from bot import get_ans,chatting
import threading
import time

from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'

socketio = SocketIO(app)

sending_to_socket = {}

new_messages = []
def autoChat():
    global new_messages
    while True:
        new_messages.append(chatting())
        time.sleep(4)

auto_bot = threading.Thread(target=autoChat)
auto_bot.start()

#Home directory
@app.route('/')
def home():
    return redirect('/socket')

#Answering route
@app.route('/chat',methods=['POST'])
def chat():
    mess = request.form.get('message')
    ans = get_ans(mess)
    return jsonify({'message':ans})

# Routes for websocket method
@app.route('/socket')
def socket():
    global new_messages
    new_messages.clear()
    return render_template("chatbox.html", method="socket")

@socketio.on('connect')
def on_connect( data):
    sending_to_socket[request.sid] = True
    auto = threading.Thread(target = send_random_to_socket,args=(request.sid,))
    auto.start()


@socketio.on('disconnect')
def on_disconnect(data):
    sending_to_socket[request.sid] = False


@socketio.on('message')
def on_message(data, methods=['GET', 'POST']):
    ans = get_ans(data)
    socketio.send(ans,room=request.sid)

def send_random_to_socket(sid):
    while sending_to_socket[sid]:
        try:
            ans = new_messages.pop()
            socketio.send({ 'message': ans.message})
        except:
            pass
if __name__ == "__main__":
    socketio.run(app, host='localhost', port=5000,debug = True)

