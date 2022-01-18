import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

function App() {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [userNameSet, setUserNameSet] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [messageList, setMessageList] = useState([])

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setMessageSubmitted(!messageSubmitted); 
    const socket = io("http://localhost:3001");
    socket.on("connection", data => {
      console.log('data', data)
    });
    socket.emit('sendmessage', {
      user,
      message
    });
    socket.on('message', (data) => {
     let messageListCopy = messageList;
     console.log(messageListCopy);
     messageListCopy.push(data);
     setMessageList(messageListCopy);
    })
    setMessage('')
  }

  const handleSubmitUsername = e => {
    e.preventDefault();
    setUserNameSet(true); 
  }

  useEffect(() => {
    
  }, [messageSubmitted]);


  return (
    <div class="container-fluid">
      {!userNameSet ? 
        <>
        
        <div className="row">
            <div class="col-lg-6">
              <form onSubmit={(e) => handleSubmitUsername(e)}>
                <div class="input-group">
                    <input id="m" autocomplete="off" type="text" class="form-control" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} aria-label="Username" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="submit">Send</button>
                    </span>
                  </div>
              </form>
            </div>
          </div>
        </>
     :
     <>
     <div className="row">
          <ul id="messages">

            {messageList.map(e => <li>{e.user} - {e.message}</li>)}
          </ul>
        </div>
    
     <div class="row">
         <div className="col-lg-6">
              <form id='message-submit-form' onSubmit={(e) => handleSubmitMessage(e)}>
                <div className="input-group">
                    <input id="m" autocomplete="off" type="text" class="form-control" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} aria-label="Message..." />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="submit">Send</button>
                    </span>
                  </div>
              </form>
          </div>
      </div>
      </>
     }
     
    </div>
  );
}

export default App;
