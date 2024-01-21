// LawChatC.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBarChatLaw from './SideBarChatLaw';
import ChatMessage from './ChatMessage';
import {io} from "socket.io-client";

const ENDPOINT = "http://localhost:5000"
let socket, selectedChatCompare

const LawChat = () => {
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [newMessage, setNewMessage] = useState({
        data:""
    });
    const [socketConnected, setSocketConnected] = useState(false);

    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("lawToken");
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    useEffect(() => {
        fetchChats();
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
    const fetchChats = async () => {
        try {
            const res = await authAxios.get('chat/fetchChatLaw');
            setChats(res.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    const fetchMsgs = async (id) => {
        try {
            const res = await authAxios.get(`msg/getMsgLaw/${id}`)
            setMsg(res.data);
            socket.emit("join chat",id)
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

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
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    const handleChatItemClick = (chatId) => {
        sessionStorage.setItem("chatId", chatId)
        setSelectedChatId(chatId);
        fetchMsgs(chatId);
    };

    return (
        <div className="flex flex-col h-screen ">
            <div className="flex">
                <SideBarChatLaw chats={chats} onChatItemClick={handleChatItemClick} />
                <div className="w-full">
                    <p>Selected Chat ID: {selectedChatId}</p>
                    <div>
                        {msg.map((message) => (
                            <div key={message._id}>
                                <ChatMessage message={message} />
                            </div>
                        ))}
                    </div>
                    {/* Input field and send button */}
                    <div className="flex justify-between items-center p-4 bg-gray-200">
                        <input
                            type="text"
                            value={newMessage.data} onChange={(event)=>{
                            setNewMessage({...newMessage,data:event.target.value})}}
                            placeholder="Type your message..."
                            className="flex-grow p-2 mr-2 border border-gray-300 rounded"
                        />
                        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawChat;
