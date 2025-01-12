
import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import { ToastContainer } from 'react-toastify';
import List from './pages/List';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

function App() {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || ""); 

  useEffect(() => {
    localStorage.setItem('token', token);
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
              <Sidebar/>
              <div className='w-[70%] mx-auto ml-[max(5vw,25px) my-18] text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                {/* <Route path='/orders' element={<Order token={token} />} /> */}
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
