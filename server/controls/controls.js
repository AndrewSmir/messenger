const fs = require('fs')

module.exports = {
    getCreator(req, pathToFile){
        let id = req.params.id;
        return new Promise((resolve, rej)=>{
            fs.readFile(`${pathToFile}/${id}.json`,'UTF-8', (err, data)=>{
                if(!err){
                    resolve(data)
                }
            })
        })
    },

    addMessage(req, pathToFile){
        return new Promise((resolve, rej)=>{
            fs.readFile(`${pathToFile}/messages.json`, 'UTF-8', (err, data) => {
                if (!err) {
                    let messages = JSON.parse(data);
                    let newId = '';
                    if (messages.length === 0) {
                        newId = 'm-1';
                        req.body.id = newId;
                    } else {
                        newId = messages[messages.length-1].id.slice(0,2)+(+messages[messages.length-1].id.slice(2) + 1);
                        req.body.id = newId;
                    }
                    messages = [...messages, req.body]

                    fs.writeFile(`${pathToFile}/messages.json`, JSON.stringify(messages), (err) => {
                        if (!err) {
                            resolve(req.body)
                        } else {
                            resolve('0')
                        }
                    });
                }
            })
        })
    },

    deleteMessage(req, pathToFile){
        return new Promise((resolve, rej)=>{
            fs.readFile(`${pathToFile}/messages.json`, 'UTF-8', (err, data) => {
                if (!err) {
                    let messages = JSON.parse(data);
                    let msgToDelete = messages.findIndex(msg => msg.id === req.body.id)
                    msgToDelete >= 0 ? messages.splice(msgToDelete, 1) : msgToDelete

                    fs.writeFile(`${pathToFile}/messages.json`, JSON.stringify(messages), (err) => {
                        if (!err) {
                            resolve(req.body)
                        } else {
                            resolve('some error')
                        }
                    });
                }
            })
        })
    },

    addChatToUser(pathToFile, mainUser, additionalUser, chatId){
        fs.readFile(`${pathToFile}/${mainUser}.json`, 'UTF-8', (err, data) => {
            const userData = JSON.parse(data)
            userData.chats = [...userData.chats, {
                id: `c-${chatId}`,
                name: additionalUser
            }]
            fs.writeFile(`${pathToFile}/${mainUser}.json`, JSON.stringify(userData, null, ' '), err => {})
        })
    },

    deleteUserChat(pathToFile, user, chatId){
        fs.readFile(`${pathToFile}/${user}.json`, 'UTF-8', (err, data) => {
            const userData = JSON.parse(data)
            userData.chats = userData.chats.filter(chat => chat.id !== chatId)
            fs.writeFile(`${pathToFile}/${user}.json`, JSON.stringify(userData, null, ' '), err => {})
        })
    }
}