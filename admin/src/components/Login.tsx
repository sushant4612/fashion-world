import React, { useState } from "react"
import axios from "axios"
import {toast} from 'react-toastify';
import { backendUrl } from "../App";

interface LoginProps {
    setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, {
                email,
                password
            })

            if(response.data.success){
                setToken(response.data.token);
                toast.success('Login successful!')
            }else{
                toast.error(response.data.message)
            }
        } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data?.message || 'An error occurred')
            }else{
                toast.error((error as Error).message || 'An unknown error occurred')
            }
            console.error('Error during login:', error);
        }
    }

    return (
       <div className="min-h-screen bg-slate-700 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                        <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"/>
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"/>
                    </div>
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">
                        Login
                    </button>
                </form>
            </div>
       </div>
    )
}

export default Login