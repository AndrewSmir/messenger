const ctrl = require('./controls/controls')

const express = require('express');
const fs = require('fs')

const usersPath = './server/db/users'
const messagesPath = './server/db/messages'
const chatsPath = './server/db/chats'

const app = express();
app.use(express.json());

app.get('/user/:id', (req, res) => {
    ctrl.getCreator(req, usersPath).then(data => res.send(data))
})

app.get("/messages", (req, res) => {
    fs.readFile(`${messagesPath}/messages.json`, 'UTF-8', (err, data) => {
        if (!err) {
            res.send(data)
        }
    })
})

app.get('/chat/:id', (req, res) => {
    ctrl.getCreator(req, chatsPath).then(data => res.send(data))
})

app.post("/messages/addMessage", (req, res) => {
    ctrl.addMessage(req, messagesPath)
        .then(updatedReq => {
            fs.readFile(`${chatsPath}/${req.body.chatId}.json`, 'UTF-8', (err, data) => {
                if (!err) {
                    const chatData = JSON.parse(data);
                    chatData.users = chatData.users.find(user => user === updatedReq.sender) ? chatData.users : [...chatData.users, updatedReq.sender];
                    chatData.messages = [...chatData.messages, updatedReq.id]

                    fs.writeFile(`${chatsPath}/${updatedReq.chatId}.json`, JSON.stringify(chatData), (err) => {
                        if (!err) {
                            res.send(updatedReq)
                        } else {
                            res.send('some error')
                        }
                    })
                }
            })
        })
})

app.put('/messages/delete', (req, res) => {
    ctrl.deleteMessage(req, messagesPath)
        .then(request => {
            fs.readFile(`${chatsPath}/${request.chatId}.json`, 'UTF-8', (err, data) => {
                if (!err) {
                    const chatData = JSON.parse(data);
                    let msgToDelete = chatData.messages.findIndex(msg => msg === request.id)
                    msgToDelete >= 0 ? chatData.messages.splice(msgToDelete, 1) : msgToDelete
                    console.log(chatData);

                    fs.writeFile(`${chatsPath}/${request.chatId}.json`, JSON.stringify(chatData), (err) => {
                        if (!err) {
                            res.send('msg deleted')
                        } else {
                            res.send('some error')
                        }
                    })
                }
            })
        })
})


app.listen(3300, () => {
    console.log('Server @ 3300');
})