import { Bell, ChevronDown, LogOut, User, UserCircle, Store, Home, BookText, MessageSquare, ChevronUp } from 'lucide-react'
import { useState } from 'react';
import {Link }from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <header className="bg-white flex items-center justify-between md:px-3 px-2  border-b shadow-sm">
                <div className="flex items-center space-x-3">
                
                    <div className="flex items-center space-x-1">
                        <h2 className="font-bold text-black md:text-2xl text-lg">Dashboard</h2>
                        <img src="/luckmytrip.png" alt="Opencart" className="md:h-10 h-8 w-10 md:w-12" />
                    </div>
                </div>

                <div className="flex items-center   justify-end md:space-x-4 space-x-2">
                    
                    <div className="relative hover:bg-gray-100 py-3">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            
                            <UserCircle className="md:w-8 md:h-8 w-5 h-5 text-blue-500 rounded-full border" />
                            <span className="font-medium text-blue-500 hidden md:blok">Super Admin</span>
                            {!open ? (<ChevronDown className="w-4 h-4 text-blue-500" />) : (<ChevronUp className="w-4 h-4 text-blue-700" />)}
                        </button>
                        {open && (
                            <div className="absolute right-0  mt-3 md:w-48 w-32 bg-white rounded shadow-lg border z-50 ">
                                <div className=" px-4 py-2 flex items-center gap-2 hover:bg-blue-50 cursor-pointer">
                                    <User className="md:w-5 md:h-5 w-4 h-4  text-blue-500" />
                                    <span className='text-xs md:text-base'>Your Profile</span>
                                </div>
                                
                                <div className="border-b px-4 py-2 flex items-center gap-2 hover:bg-blue-50 cursor-pointer">
                                    <Store className="md:w-5 md:h-5 w-4 h-4 text-blue-500" />
                                   <Link to="/" className='text-xs md:text-base'>Open Site</Link> 
                                </div>

                            </div>
                        )}
                    </div>

                    <div className='flex items-center space-x-1 cursor-pointer hover:bg-gray-100 md:py-4 py-2'>
                        <span className='text-blue-500 font-medium md:text-medium text-sm'>Logout</span>
                        <LogOut className="md:w-6 md:h-6 w-5 h-5 text-blue-500" />
                    </div>
                    
                </div>
            </header>

        </>
    )
}

export default Header
