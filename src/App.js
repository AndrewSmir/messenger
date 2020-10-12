import React, {useState} from 'react';
import './App.css';

function App() {
  const [data, changeData] = useState([{text: 'yoyoy'}])
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

  return (
    <div className="App">
      <div>
      </div>
    </div>
  );
}

export default App;
