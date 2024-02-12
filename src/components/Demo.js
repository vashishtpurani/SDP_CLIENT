import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaPen } from "react-icons/fa";

const Chatmain = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [hovered, setHovered] = useState(false)

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarWidth = sidebarOpen ? "w-[10%]" : "w-[4%]";
    const buttonChange = sidebarOpen ?"w-32":"";
    const buttonChange2 = hovered?"w-32":"";
    return (
        <div className={`h-screen w-screen bg-green-500 flex flex-col`}>
            <nav className="shadow">
                <div className="bg-gray-800 w-screen px-4 sm:px-4 lg:px-5">
                    <div className="flex justify-start items-center h-16 space-x-3">
                        <div className={"flex flex-row space-x-3"}>
                            <div className="text-white ml--8">
                                <IoMenu size={36} onClick={toggleSidebar} />
                            </div>
                            <div className="flex-shrink-0 justify-start flex items-center">
                                <span>LOGO</span>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <form onSubmit={handleSearchSubmit} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search"
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-gray-600 w-1/2 h-full"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`h-full bg-gray-800 ${sidebarWidth} hover:w-[10%] transition-width duration-500 items-start justify-start`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <div className={`sidebar-icon group ${buttonChange} ${buttonChange2}`}>
                    <FaPen size="20"/>
                </div>
            </div>
        </div>
    );
};

export default Chatmain;

const SidebarIcon = ({ icon }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip">Raise</span>
    </div>
);

