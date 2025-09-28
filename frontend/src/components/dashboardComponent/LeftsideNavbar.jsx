import { useState } from "react";
import { Home, FileText, Users, ShoppingCart, Search, ChevronDown, Puzzle, Monitor, User, Tag, MenuIcon } from "lucide-react";


const LeftsideNavbar = () => {
    const [openDropdown, setOpenDropdown] = useState({
        home: false,
        catalog: false,
        customers: false,
        extensions: false,
        design: false,
        sales: false,
        marketing: false,
        system: false
    });

    const submenu = (section) => [
        { label: `Marketplace (${section})`, icon: <Tag className="w-4 h-4 mr-2" /> },
        { label: `Installer (${section})`, icon: <Puzzle className="w-4 h-4 mr-2" /> },
        { label: `Startup (${section})`, icon: <Monitor className="w-4 h-4 mr-2" /> }
    ];
    const navData = [
        { key: "dashboard", icon: <Home className={`w-5 h-5 mr-2 `} />, label: "Dashboard" },
        { key: "pages", icon: <Home className={`w-5 h-5 mr-2 `} />, label: "Pages" },
        { key: "users", icon: <FileText className={`w-5 h-5 mr-2 `} />, label: "Users" },
        { key: "customers", icon: <Users className={`w-5 h-5 mr-2 `} />, label: "Customers" },
        // { key: "sales", icon: <ShoppingCart className={`w-5 h-5 mr-2 `} />, label: "Sales" },
        // { key: "marketing", icon: <Tag className={`w-5 h-5 mr-2 `} />, label: "Marketing" },
        // { key: "system", icon: <User className={`w-5 h-5 mr-2 `} />, label: "System" }
    ];
    return (
        <>
            <nav className="bg-[#11303d] text-white w-60 min-h-full flex flex-col  sidebar-responsive">
                <div className='flex items-center px-6 py-2 text-white font-semibold text-lg bg-[#062d3e] '>
                    <MenuIcon className='w-5 h-5 mr-2' />
                    <span>Navigation</span>
                </div>

                {navData.map((item) => (
                    <div key={item.key} className=" border-t-2 border-t-neutral-700  ">
                        <button
                            onClick={() => setOpenDropdown((prev) => ({
                                ...prev,
                                [item.key]: !prev[item.key]
                            }))}
                            className="flex items-center w-full px-4 py-2 hover:bg-[#022432]  transition justify-between"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            <ChevronDown className="ml-auto w-4 h-4" />
                        </button>
                        {/* Dropdown - 3 nested items */}
                        {openDropdown[item.key] && (
                            <div div 
                            className= {` bg-[#1d3b48] space-y-1 overflow-hidden flex-col items-center justify-center  transition-[max-height] duration-300 ease-in-out 
                                ${openDropdown[item.key] ? "max-h-96 " : "max-h-0 py-0"
                            }`}>
                                
                        {submenu(item.label).map((sub, idx) => (
                            <div
                                key={idx}
                                className="flex items-center  px-2 py-2 hover:bg-[#11303d] rounded cursor-pointer"
                            >
                                {sub.icon}
                                <span>{sub.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
                ))}
        </nav >
        </>
    )
}

export default LeftsideNavbar
