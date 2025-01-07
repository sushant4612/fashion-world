
import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState<string>('')
  return (
    <div className='bgColor'>
      <Navbar setToken={setToken}/>
      {/* <Login setToken={setToken}/> */}
      <Sidebar/>
    </div>
  )
}

export default App
