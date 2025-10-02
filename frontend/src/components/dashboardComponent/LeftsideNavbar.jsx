import { useState } from "react";
import { Home, FileText, Users, ShoppingCart, Search, ChevronDown, Puzzle, Monitor, User, Tag, MenuIcon, BookOpen, CircleUserRound, ChevronRight } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiAdminFill  } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import { MdContentPaste } from "react-icons/md";
import {Link} from "react-router-dom"



const LeftsideNavbar = () => {


    const [openSection, setOpenSection] = useState("dashboard");
    const [pagesOpen, setPagesOpen] = useState(null);
     const [sidebarOpen, setSidebarOpen] = useState(false);
    //   const [usersOpen, setUsersOpen] = useState(false);

    //   // Nested for Home/Explore accordions
    //   const [homeOpen, setHomeOpen] = useState(false);
    //   const [exploreOpen, setExploreOpen] = useState(false);

    // Handlers
    const handleSection = (section) => {
        if (openSection === section) setOpenSection(null);
        else setOpenSection(section);
    };

    const handlePages = (option) => {
        if (pagesOpen === option) setPagesOpen(null);
        else setPagesOpen(option);
    };
    return (
        <>
            <nav className=" bg-white shodow-lg w-auto min-h-full  flex-col  sidebar-responsive px-2 hidden md:flex">
                <div className='flex items-center px-5 py-2  font-semibold text-lg  '>
                    <MenuIcon className='w-5 h-5 mr-2' />
                    <span>Navigation</span>
                </div>


                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg transition cursor-pointer hover:bg-blue-200
                    ${openSection === "dashboard" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("dashboard")}>
                    <LuLayoutDashboard className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2 `}>
                        Dashboard </button>
                </div>

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg transition cursor-pointer hover:bg-blue-200
                    ${openSection === "pages" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("pages")}>
                    <BookOpen className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2 `}>
                        Pages</button>

                </div>


                {openSection === "pages" && (
                    <div className="flex flex-col   border-gray-200  ">
                        <div className={`gap-2 flex items-center justify-start  px-6 rounded-lg mt-1
            ${pagesOpen === "home" ? "bg-blue-200 font-semibold" : ""}`}
                            onClick={() => handlePages("home")}>
                            <Home className="w-5 h-5" />
                            <button className={`text-left  py-2 `}> Home</button>
                        </div>
                        {pagesOpen === "home" && (
                            <div className="flex flex-col  border-gray-100">
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/journey'}>Journey</Link></button>
                                </div >
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/jackpot'}>Jackpot</Link></button>
                                </div>
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/spinluck'}>SpinLuck offers</Link></button>
                                </div>     
                            </div>
                        )}

                        <div className={`gap-2 flex items-center justify-start  px-6 rounded-lg 
            ${pagesOpen === "explore" ? "bg-blue-200 font-semibold" : ""}`}
                            onClick={() => handlePages("explore")}>
                            <MdOutlineExplore className="w-5 h-5" />
                            <button className={`text-left  py-2 `}>Explore</button>
                        </div>

                        {pagesOpen === "explore" && (
                            <div className="flex flex-col   border-gray-100">
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Dream Trip</button>
                                </div >
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Trip Info</button>
                                </div>
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Golden winner info</button>
                                </div>     
                            </div>
                        )}
                    </div>
                )}

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg  transition cursor-pointer hover:bg-blue-200
                    ${openSection === "users" ? "bg-blue-400 font-semibold" : ""}`} onClick={() => handleSection("users")}>
                    <User className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2  `}> Users</button>
                </div>

                {openSection === "users" && (
                    <div className="flex flex-col pl-8  gap-1 ">
                        <div className="flex justify-start items-center">
                            <RiAdminFill className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">super Admin</button>
                        </div>
                        <div className="flex justify-start items-center">
                            <RiAdminLine className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">Admin</button>
                        </div>
                        <div className="flex justify-start items-center">
                            <MdContentPaste className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">Content-Creater</button>
                        </div>
                    </div>
                )}

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg  transition cursor-pointer hover:bg-blue-200
                    ${openSection === "client" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("client")}>
                    <Users className="w-5 h-5" />
                    <button
                        className={`text-left px-5 py-2  `}>
                        Client</button>

                </div>

            </nav >
        <button
        className=" md:hidden fixed top-11 left-0  z-20 p-1 bg-white "
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen((prev) => !prev)
        }
      >
        <MenuIcon className="w-6 h-6" />
      </button>
      {sidebarOpen && (
        <div className="absolute top-11 left-0  bg-white flex flex-col gap-4 p-4 md:hidden z-10 h-auto w-auto">

            <div  className="flex flex-col gap-1  px-5">
                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg transition cursor-pointer hover:bg-blue-200
                    ${openSection === "dashboard" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("dashboard")}>
                    <LuLayoutDashboard className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2 `}>
                        Dashboard </button>
                </div>

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg transition cursor-pointer hover:bg-blue-200
                    ${openSection === "pages" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("pages")}>
                    <BookOpen className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2 `}>
                        Pages</button>

                </div>


                {openSection === "pages" && (
                    <div className="flex flex-col   border-gray-200  ">
                        <div className={`gap-2 flex items-center justify-start  px-6 rounded-lg mt-1
            ${pagesOpen === "home" ? "bg-blue-200 font-semibold" : ""}`}
                            onClick={() => handlePages("home")}>
                            <Home className="w-5 h-5" />
                            <button className={`text-left  py-2 `}> Home</button>
                        </div>
                        {pagesOpen === "home" && (
                            <div className="flex flex-col  border-gray-100">
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/journey'}>Journey</Link></button>
                                </div >
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/jackpot'}>Jackpot</Link></button>
                                </div>
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 "><Link to={'/home/spinluck'}>SpinLuck offers</Link></button>
                                </div>     
                            </div>
                        )}

                        <div className={`gap-2 flex items-center justify-start  px-6 rounded-lg 
            ${pagesOpen === "explore" ? "bg-blue-200 font-semibold" : ""}`}
                            onClick={() => handlePages("explore")}>
                            <MdOutlineExplore className="w-5 h-5" />
                            <button className={`text-left  py-2 `}>Explore</button>
                        </div>

                        {pagesOpen === "explore" && (
                            <div className="flex flex-col   border-gray-100">
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Dream Trip</button>
                                </div >
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Trip Info</button>
                                </div>
                                <div className="flex items-center justify-start py-1 px-6">
                                    <ChevronRight className="w-5 h-5" />
                                    <button className="text-left px-4 py-2 ">Golden winner info</button>
                                </div>     
                            </div>
                        )}
                    </div>
                )}

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg  transition cursor-pointer hover:bg-blue-200
                    ${openSection === "users" ? "bg-blue-400 font-semibold" : ""}`} onClick={() => handleSection("users")}>
                    <User className="w-5 h-5 " />
                    <button className={`text-left px-5 py-2  `}> Users</button>
                </div>

                {openSection === "users" && (
                    <div className="flex flex-col pl-8  gap-1 ">
                        <div className="flex justify-start items-center">
                            <RiAdminFill className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">super Admin</button>
                        </div>
                        <div className="flex justify-start items-center">
                            <RiAdminLine className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">Admin</button>
                        </div>
                        <div className="flex justify-start items-center">
                            <MdContentPaste className="w-5 h-5 " />
                            <button className="text-left px-4 py-2 ">Content-Creater</button>
                        </div>
                    </div>
                )}

                <div className={`gap-1 flex items-center justify-start  px-5  rounded-lg  transition cursor-pointer hover:bg-blue-200
                    ${openSection === "client" ? "bg-blue-400 font-semibold" : ""}`}
                    onClick={() => handleSection("client")}>
                    <Users className="w-5 h-5" />
                    <button
                        className={`text-left px-5 py-2  `}>
                        Client</button>

                </div>

            </div>
            </div>
      )}




        </>
    )
}
export default LeftsideNavbar



