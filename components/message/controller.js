const { socket } = require('../../socket')
const store = require('./store')

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if(!chat || !user || !message) {
            reject("Invalid data.")
        }

        let fileUrl = ""
        if(file) {
            fileUrl = `http://localhost:3000/app/files/${file.filename}`;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message : message,
            date: new Date(),
            file: fileUrl,
        };
        store.add(fullMessage);
        socket.io.emit('message', fullMessage);
        resolve(fullMessage);
    })
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise( async (resolve, reject) => {
        if(!id || !message) {
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    });
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject('Invalid data');
            return false;
        }
        store.removeMessage(id)
        .then(() => {
            resolve()
        })
        .catch(e => {
            reject(e)
        });
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};