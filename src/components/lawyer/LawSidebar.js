// Sidebar.js
import React from 'react';
import {AiOutlineHome, AiOutlineUserAdd} from "react-icons/ai";
import {BsChat} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

const LawSidebar = () => {
    const navigate = useNavigate()
    const redReq = ()=>{
        navigate('/law/req')
    }
    const redChat = ()=>{
        navigate('/law/chat')
    }
    return (
        <div className=" top-0 left-0 h-100% w-16 flex flex-col bg-gray-900 text-white shadow-2xl">
            <SidebarIcon icon={<AiOutlineHome size="28"/>} text={"home"}/>
            <button onClick={()=>redChat()}><SidebarIcon icon={<BsChat size="28"/>} text={"chat"}/></button>
            <SidebarIcon icon={<BiUser size="28"/>} text={"profile"}/>
            <button onClick={()=>redReq()}><SidebarIcon icon={<AiOutlineUserAdd size="28"/>} text={"reqs"}/></button>
        </div>
    );
};
const SidebarIcon = ({icon,text="hehe"})=>(
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
)
export default LawSidebar;
