// SidebarChatLaw.js
import React from 'react';

const SideBarChatLaw = ({ chats, selectedChatId, onChatItemClick }) => {
    return (
        <div className="bg-gray-800 text-white p-4 h-screen">
            <h2 className="text-xl font-bold mb-4">Chats</h2>
            <ul>
                    {chats.map((chat) => (
                    <li
                        key={chat._id}
                        className={`cursor-pointer p-2 hover:bg-gray-600 mb-2 rounded ${selectedChatId === chat._id ? 'bg-gray-600' : ''}`}
                        onClick={() => onChatItemClick(chat._id)}
                    >
                        <p className={`font-bold ${selectedChatId === chat._id ? 'text-yellow-300' : ''}`}>
                            {chat.users.firstName} {chat.users.lastName}
                        </p>
                        <p className="text-gray-400">{chat.latestMessage.content[0]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBarChatLaw;
