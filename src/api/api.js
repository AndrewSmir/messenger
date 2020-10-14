import * as axios from "axios";

export const chatsAPI = {
    getChats(userId){
        return axios.get(`/chats/${userId}`).then(response => response.data.chats)
    }
}

export const messagesApi = {
    getMessages(){
        return axios.get('/messages').then(response => response.data)
    },
    sendMessage(sender, text, chatId){
        return axios.post('/messages/addMessage', {sender, text, chatId}).then(response => response.data)
    },
    deleteMessage(chatId, id){
        return axios.put('/messages/delete', {chatId, id}).then(response => console.log(response.data))
    }
}

export const authApi = {
    login(data){
        return axios.put('/auth', data).then(response => response.data)
    },
    registerUser(data){
      return axios.post('auth/register', data).then(response => response.data)
    }
}


/*
  const changeInfo = () => {
    async function getMessagesFromChat(){
      const chatsData = await axios.get('/chat/c-2').then(response=>response.data)
      const messagesData = await axios.get('/messages').then(response=>response.data)
      return messagesData.filter(msgId => chatsData.messages.find(message => message === msgId.id))
    }
    getMessagesFromChat().then(data => changeData(data))
  }
  */

// удалить сообщение
//axios.put('/messages/delete', {chatId: 'c-2', id:'m-45'})

//axios.get('/user/u-2').then(response=>console.log(response.data))

/* сообщения для конкретного чата
async function getMessagesFromChat(){
  const chatsData = await axios.get('/chat/c-2').then(response=>response.data)
  const messagesData = await axios.get('/messages').then(response=>response.data)
  return messagesData.filter(msgId => chatsData.messages.find(message => message === msgId.id))
}
getMessagesFromChat().then(data => console.log(data))
 */

//axios.get('/chat/c-2').then(response=>console.log(response.data))
//axios.get('/messages').then(response=>console.log(response.data))
//axios.post('/messages/addMessage', { sender: 'bot', text: '234', chatId: 'c-2' }).then(response=>console.log(response.data))