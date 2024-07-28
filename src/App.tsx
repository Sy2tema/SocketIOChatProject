import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io, Socket } from 'socket.io-client';

type SocketType = Socket | null;

function App() {
  const [count, setCount] = useState(0)

  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<SocketType>(null);
  const [username, setUsername] = useState('');
  const [userInput, setUserInput] = useState('');

  const connectToChatServer = () => {
    const _socket = io('http://localhost:3000', {
      autoConnect: false,
      query: {
        username: username,
      },
    });
    _socket.connect();
    setSocket(_socket);
  };

  const disconnectToChatServer = () => {
    socket?.disconnect();
    setSocket(null);
  };

  const onConnected = () => {
    console.log('frontend onConnected');
    setIsConnected(true);
  };

  const onDisconnected = () => {
    console.log('frontend onDisconnected');
    setIsConnected(false);
  };

  const onMessageReceived = (message: object) => {
    console.log('frontend onMessageReceived');
    console.log(message);
  };

  const sendMessageToChatServer = () => {
    console.log(`sendMessageToChatServer input: ${userInput}`);

    socket?.emit("new message", { username: username, message: userInput }, (response: object) => {
      console.log(response);
    });
  };

  useEffect(() => {
    socket?.on('connect', onConnected);
    socket?.on('disconnect', onDisconnected);
    socket?.on('new message', onMessageReceived);

    return () => {
      socket?.off('connect', onConnected);
      socket?.off('disconnect', onDisconnected);
      socket?.off('new message', onMessageReceived);
    };
  }, [socket]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <h1>유저: {username}</h1>
      <h2>현재 접속상태: {isConnected ? "접속중" : "미접속"}</h2>
      <div className='card'>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        {socket ?
          <button onClick={() => disconnectToChatServer()}>
            접속 해제하기
          </button> :
          <button onClick={() => connectToChatServer()}>
            접속하기
          </button>
        }
      </div>
      {socket && (
        <div className='card'>
          <input value={userInput} onChange={e => setUserInput(e.target.value)} />
          <button onClick={() => sendMessageToChatServer()}>
            전송
          </button>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
