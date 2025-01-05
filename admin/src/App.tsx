
import { useState } from 'react'
import './App.css'
import Login from './components/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;


function App() {
  const [token, setToken] = useState<string>('')
  return (
    <>
    <Login setToken={setToken}/>
    </>
  )
}

export default App
