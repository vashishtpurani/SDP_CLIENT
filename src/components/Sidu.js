import React from 'react';
import {BsChat,BsExclamationCircle} from "react-icons/bs";
import {IoIosNotificationsOutline} from "react-icons/io";
import {GoHome} from "react-icons/go";
import {useNavigate} from "react-router-dom";

const Sidu = () => {
    const navigate = useNavigate()
    const red = (i)=>{
        navigate(`${i}`)
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-26 flex flex-col bg-white text-black shadow-2xl text-center pr-44 border-r-1">
            <button onClick={()=>red("/homu")}><SidebarIcon icon={<GoHome  size="28"/>} text={"Home"}/></button>
            <button onClick={()=>red("chat")}><SidebarIcon icon={<BsChat size="28"/>} text={"Chat"}/></button>
            <button onClick={()=>red("Alerts")}><SidebarIcon icon={<IoIosNotificationsOutline  size="28"/>} text={"Alerts"}/></button>
        </div>
    )
}
const SidebarIcon = ({icon,text="hehe"})=>(
    <div className="sidebar-icon-user group">
        {icon}
        {/*<span className="sidebar-tooltip-user group-hover:scale-100">*/}
        {/*    {text}*/}
        {/*</span>*/}
        <div className={"sidebar-text-user "}>
            {text}
        </div>
    </div>
)



export default Sidu;
