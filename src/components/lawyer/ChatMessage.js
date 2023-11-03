// ChatMessage.js
import React from 'react';
import '../ChatMessage.css'; // Import your CSS file or use inline styles

const ChatMessage = ({ message }) => {
    const messageClass = message.user ? 'user-message' : 'lawyer-message';

    return (
        <div className={`flex message-container ${messageClass}`}>
            <div>
                <p className="font-bold">{message.sender}</p>
                <p>{message.content[0]}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
