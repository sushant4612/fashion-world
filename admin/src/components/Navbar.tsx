import React from "react";
import { assets } from "../assets/assets";

interface NavbarProps {
    setToken: (token: string) => void
}

const Navbar: React.FC<NavbarProps> = ({setToken}) => {
    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <div className="flex items-center">
                <img style={{ width: 'max(7%, 40px)' }} src={assets.logo} alt="" />
                <p className="font-semibold">Flowerrrr World</p>
                <img style={{ width: 'max(7%, 40px)' }} src={assets.logo} alt="" />
            </div>
            <button onClick={() => setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
        </div>
    )
}

export default Navbar