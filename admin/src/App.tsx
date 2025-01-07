
import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState<string>('')
  return (
    <div className='bgColor'>
      <Navbar setToken={setToken}/>
      {/* <Login setToken={setToken}/> */}
      <Sidebar/>
      <div className='w-[70%] mx-auto ml-[max(5vw,25px) my-18] text-gray-600 text-base'>
        <Routes>
            <Route path='/add' element={<Add  token={token}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
