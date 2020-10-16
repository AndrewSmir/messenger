import * as axios from "axios";

export const chatsAPI = {
    getChats(userId){
        return axios.get(`/chats/${userId}`).then(response => response.data)
    },

    addNewChat(userId, companion){
        return axios.put('/chats/add', {userId, companion}).then(response=>response.data)
    },

    deleteChat(chatId, userId, companion){
        return axios.post('/chats/delete', {chatId, userId, companion}).then(response => response.data)

    },

    inviteToMessenger(user){
        return axios.put('/chats/invite', user).then(response => response.data)
    },
}

export const messagesApi = {
    getMessages(chatId){
        return axios.get(`/messages/${chatId}`).then(response => response.data)
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

export const usersApi = {
    getRegisteredUsers(){
        return axios.get('/users').then(response => response.data)
    }
}

usersApi.getRegisteredUsers()
