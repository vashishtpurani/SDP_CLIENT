import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const ENDPOINT = "http://localhost:5000"
let socket, selectedChatCompare

const ChatMain = ()=>{

    const [chats, setChats] = useState([])
    const [msg, setMsg] = useState([])
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [selectedChatName, setSelectedChatName] = useState("")
    const [newMessage, setNewMessage] = useState({
        data:""
    });
    const [socketConnected, setSocketConnected] = useState(false)
    const messagesRef = useRef(null)

    const baseURL = "http://localhost:5000/"
    const token = sessionStorage.getItem("token")
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    useEffect(() => {
        fetchChats()
        socket = io(ENDPOINT)
        socket.emit("setup",token)
        selectedChatCompare = sessionStorage.getItem("chatId");
    }, []);
    useEffect(() => {
        // console.log("UUU LA LA AL ALAL LA")
        socket.on("message received", (newMessageRecieved) => {
            console.log("UUU LA LA AL ALAL LA",newMessageRecieved)
            setMsg([...msg, newMessageRecieved]);
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {

            } else {
                setMsg([...msg, newMessageRecieved]);
            }
        });
    });
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [msg]);
    const fetchChats = async () => {
        try {
            const res = await authAxios.get('chat/fetchChatUser');
            console.log(res.data)
            setChats(res.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    const fetchMsgs = async (id) => {
        try {
            const res = await authAxios.get(`msg/getMsgUser/${id}`)
            console.log(res)
            setMsg(res.data);
            socket.emit("join chat",id)
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    const sendMessage = async () => {
        // if (newMessage.trim() === "") {
        //     return;
        // }
        console.log("abc")
        try {
            const res = await authAxios.post(`msg/sendMsg/${selectedChatId}`, newMessage)
            console.log(res)
            fetchMsgs(selectedChatId);
            socket.emit("new message",res.data)
            setNewMessage((prevMessage) => ({ ...prevMessage, data: '' }));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default behavior of the Enter key (e.g., submitting a form)
            sendMessage();
        }
    };
    const handleChatItemClick = (chatId,name) => {
        console.log(chatId)
        sessionStorage.setItem("chatId", chatId)
        setSelectedChatId(chatId);
        setSelectedChatName(name)
        fetchMsgs(chatId);
    };


    return(
        <div>
            <div className='h-screen'>
                <div className="relative  min-h-screen flex flex-col bg-lcream:">
                    {/* TOP BAR ENDS HERE */}
                    {/* CHAT LAYOUT BEGINS FROM HERE */}
                    <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
                        <div className="flex-1 min-w-0 bg-white xl:flex">
                            <div
                                className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
                                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 xl:pl-0">
                                    <div className="h-full relative">
                                        <div
                                            className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-black focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-lcream mb-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-12 w-12 rounded-full"
                                                    src="https://cdn.betterttv.net/emote/5980af4e3a1ac5330e89dc76/3x.webp"
                                                />
                                            </div>
                                            <div href="flex-1 min-w-0">
                                                <a href="client/src/components/lawyer/LawChatC#" className="focus:outline-none">
                                                    <span className="absolute inset-0"/>
                                                    <p className="text-sm font-bold text-black">INSERT NAME HERE</p>
                                                    <p className="text-sm text-gray-500 truncate">Profession here</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="relative">
                                                <div
                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 4a4  4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    name="search"
                                                    className="focus:ring-black block w-full pl-10 sm:text-sm border-gray-300 rounded-full p-2 border"
                                                />
                                            </div>
                                        </div>
                                        {/* SEARCH BOX END */}
                                        {/* USERS GO HERE */}
                                        {chats.map((chat) => (
                                            <div  key={chat._id}
                                                  className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 ${selectedChatId === chat._id ?`hover:bg-gray-200`:``}`}
                                                  onClick={() => handleChatItemClick(chat._id,chat.advUsers.advName +" "+chat.users.lastName)}
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src="https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/3x.webp"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="teext-sm font-bold text-black">
                                                            {chat.advUsers.advName} {chat.users.lastName}
                                                        </p>
                                                        <div className="text-gray-400 text-xs">
                                                            Time Comes here
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm text-gray-500 truncate">{chat.latestMessage.content[0]}</p>
                                                        <div
                                                            className="text-white text-xs bg-navyblue rounded-full px-1 py-0">
                                                            99+
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* MESSAGE AREA HERE */}
                            <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex">
                                {selectedChatId?(
                                    <div className="flex sm:items-center justify-betweem py-3 border-b border-gray-200 p-3">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src="https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x.webp"
                                                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer"
                                            />
                                            <div className="flex flex-col leading-tight">
                                                <div className="text-1xl mt-1 flex items-center">
                                                    <span className="text-gray-700 mr-3">{selectedChatName}</span>
                                                    <span className="text-green-500">
                                                        <svg width={10} height={10}>
                                                            <circle cx={5} cy={5} r={5} fill="currentColor"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="flex items-center space-x-2">
                                        </div>
                                    </div>):(null)}
                                {/* MESSAGES BEGIN HERE */}

                                <div
                                    id="messages"
                                    ref={messagesRef}
                                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                    {/* ENEMIES MESSAGE */}
                                    {msg.map((message) => (
                                        <div key={message._id}>
                                            {message.user ?(
                                                <div className="chat-message">
                                                    <div className="flex items-end justify-end">
                                                        <div
                                                            className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                                            <div>
                                                                <span
                                                                    className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-navyblue text-white">
                                                                    {message.content[0]}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <img src="https://cdn.betterttv.net/emote/5980af4e3a1ac5330e89dc76/3x.webp"
                                                             className="w-6 h-6 rounded-full order-1"/>
                                                    </div>
                                                </div>

                                            ):(
                                                  <div className="chat-message">
                                                <div className="flex items-end">
                                                <div
                                                className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                <div>
                                                <span
                                                className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                            {message.content[0]}
                                        </span>
                                        </div>
                                        </div>
                                        <img src="https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x.webp"
                                        className="w-6 h-6 rounded-full order-1"/>
                                        </div>
                                        </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* MESSAGES END HERE */}
                                {selectedChatId?(
                                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16">
                                        <div className="relative flex">
                                        <span className="absolute inset-y-0 flex items-center">
                                            {/*<button*/}
                                            {/*    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 bg-color-red hover-bg-gray-300"*/}
                                            {/*    onClick={sendMessage}*/}
                                            {/*>*/}
                                            {/*    send*/}
                                            {/*</button>*/}
                                        </span>
                                            <input placeholder="Type your message..."
                                                   className="focus:ring-gray-900 focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                                                   value={newMessage.data}
                                                   onChange={(event)=>{setNewMessage({ data: event.target.value })}}
                                                   onKeyDown={handleKeyDown}
                                            />
                                        </div>
                                    </div>):(null)}
                            </div>
                             {/*MESSAGE AREA ENDS HERE */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatMain
