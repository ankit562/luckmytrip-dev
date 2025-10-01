import { Bell, ChevronDown, LogOut, User, UserCircle, Store, Home, BookText, MessageSquare, ChevronUp } from 'lucide-react'
import { useState } from 'react';
import {Link }from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <header className="bg-white flex items-center justify-between px-3  border-b shadow-sm">
                <div className="flex items-center space-x-3">
                    {/* Logo & Title */}
                    <div className="flex items-center space-x-1">
                        <h2 className="font-bold text-black text-2xl">Dashboard</h2>
                        <img src="/luckmytrip.png" alt="Opencart" className="h-10 w-12" />
                    </div>
                </div>

                <div className="flex items-center   justify-end space-x-4">
                    <Bell className="w-6 h-6 text-blue-500" />

                    <div className="relative hover:bg-gray-100 py-3">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            
                            <UserCircle className="w-8 h-8 text-blue-500 rounded-full border" />
                            <span className="font-medium text-blue-500">Super Admin</span>
                            {!open ? (<ChevronDown className="w-4 h-4 text-blue-500" />) : (<ChevronUp className="w-4 h-4 text-blue-700" />)}
                        </button>
                        {open && (
                            <div className="absolute right-0  mt-3 w-48 bg-white rounded shadow-lg border z-50 ">
                                <div className=" px-4 py-2 flex items-center gap-2 hover:bg-blue-50 cursor-pointer">
                                    <User className="w-5 h-5 text-blue-500" />
                                    <span>Your Profile</span>
                                </div>
                                
                                <div className="border-b px-4 py-2 flex items-center gap-2 hover:bg-blue-50 cursor-pointer">
                                    <Store className="w-5 h-5 text-blue-500" />
                                   <Link to="/">Open Site</Link> 
                                </div>

                            </div>
                        )}
                    </div>

                    <div className='flex items-center space-x-1 cursor-pointer hover:bg-gray-100 py-4'>
                        <span className='text-blue-500 font-medium'>Logout</span>
                        <LogOut className="w-6 h-6 text-blue-500" />
                    </div>
                    
                </div>
            </header>

        </>
    )
}

export default Header
