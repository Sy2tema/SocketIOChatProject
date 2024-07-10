import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io, Socket } from 'socket.io-client';

type SocketType = Socket | null;

function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState<SocketType>(null);
  const [username, setUsername] = useState('');

  const connectToChatServer = () => {
    console.log(connectToChatServer);
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <h1>유저: {username}</h1>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
