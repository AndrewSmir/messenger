const ctrl = require('./controls/controls')

const express = require('express');
const fs = require('fs')

const usersPath = './server/db/users'
const messagesPath = './server/db/messages'
const chatsPath = './server/db/chats'

const app = express();
app.use(express.json());


app.get('/chats/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile(`${usersPath}/${id}.json`, 'UTF-8', (err, data) => {
        if (!err) {
            const chatData = JSON.parse(data)
            res.send(JSON.stringify(chatData.chats))
        }
    })
})

app.get("/messages/:chatId", (req, res) => {
    const chatId = req.params.chatId
    fs.readFile(`${messagesPath}/messages.json`, 'UTF-8', (err, data) => {
        if (!err) {
            const messages = JSON.parse(data)
            res.send(JSON.stringify((messages.filter(message => message.chatId === chatId))))
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


app.put('/auth', (req, res) => {
    const userId = req.body.login
    fs.readFile(`${usersPath}/${userId}.json`, 'UTF-8', (err, data) => {
        if (!err) {
            if (JSON.parse(data).password === req.body.password) {
                const userData = JSON.parse(data)
                res.send(JSON.stringify(userData.id))
            } else {
                res.send({
                    error: true,
                    message: 'Incorrect username / password data'
                })
            }
        } else {
            res.send({
                error: true,
                message: 'User is not registered'
            })
        }
    })
})

app.post('/auth/register', (req, res) => {
    const userId = req.body.login
    fs.readFile(`${usersPath}/${userId}.json`, 'UTF-8', (err, data) => {
        if (!err) {
            res.send({
                error: true,
                message: 'User with this login is already registered'
            })
        } else {
            let newUser = {
                id: userId,
                password: req.body.password,
                contacts: [],
                chats: []
            }
            fs.writeFile(`${usersPath}/${userId}.json`, JSON.stringify(newUser, null, ' '), err => {
                if (!err) {
                    res.send({
                        error: true,
                        message: 'User was created. Now you can enter to the messenger'
                    })
                }
            })
        }
    })
})

app.put('/chats/invite', (req, res) => {
    const invitedUser = req.body.userName
    res.send(`Invitation for ${invitedUser} was successfully send `)
})

app.put('/chats/add', async (req, res) => {
    const userId = req.body.userId
    const companion = req.body.companion
    let chatId = null

    const chatsArr = await fs.promises.readdir(chatsPath)
    chatsArr.length < 1 ? chatId = '1' : chatId = Math.max(...chatsArr.map(fileName => +fileName.slice(2, -5))) + 1

    const newChat = {
        id: `c-${chatId}`,
        users: [
            userId,
            companion
        ],
        messages: []
    }

    fs.writeFile(`${chatsPath}/c-${chatId}.json`, JSON.stringify(newChat, null, ' '), err => {
    })

    ctrl.addChatToUser(usersPath, userId, companion, chatId)
    ctrl.addChatToUser(usersPath, companion, userId, chatId)

    res.send('success')
})

app.post('/chats/delete', async (req, res) => {
    const chatId = req.body.chatId
    const userId = req.body.userId
    const companion = req.body.companion

    fs.readFile(`${messagesPath}/messages.json`, 'UTF-8', (err, data) => {
        const messages = JSON.parse(data)
        const restMessages = messages.filter(message => message.chatId !== chatId)

        fs.writeFile(`${messagesPath}/messages.json`, JSON.stringify(restMessages, null, ' '), err => {
        })
    })

    fs.unlinkSync(`${chatsPath}/${chatId}.json`)
    ctrl.deleteUserChat(usersPath, userId, chatId)
    ctrl.deleteUserChat(usersPath, companion, chatId)

    res.send('success')
})

app.get('/users', (req, res) => {
    fs.readdir(usersPath, (err, files) => {
        res.send(files.map(userName => userName.slice(0, -5)))
    })
})

app.listen(3300, () => {
    console.log('Server @ 3300');
})