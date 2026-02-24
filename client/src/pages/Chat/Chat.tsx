import React, { useState, useEffect, useRef } from "react";
import { IBasePage } from '../PageManager';
import { TChatMessage, TChatUser } from '../../services/server/types';
import CONFIG from '../../config';
import './Chat.css';

type TMessage = {
    id: number;
    author: string;
    text: string;
    time: string;
    isOwn: boolean;
}

function toMessage(row: TChatMessage, currentUserId: number | undefined): TMessage {
    const isOwn = currentUserId !== undefined && row.author_id === currentUserId;
    return {
        id: row.id,
        author: isOwn ? "Вы" : row.author,
        text: row.text,
        time: row.time,
        isOwn,
    };
}

const Chat: React.FC<IBasePage> = (props: IBasePage) => {
    const { server, store } = props;
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [users, setUsers] = useState<TChatUser[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const tick = () => {
            const hash = store.getChatHash();
            server.updateChat(hash).then((data) => {
                if (!data) return;
                store.setChatHash(data.hash);
                setUsers(data.users);
                if (data.messages !== null) {
                    const currentUser = store.getUser();
                    const currentUserId = currentUser ? currentUser.id : undefined;
                    const list = data.messages.slice().reverse();
                    setMessages(list.map((m) => toMessage(m, currentUserId)));
                }
            });
        };
        tick();
        const id = setInterval(tick, CONFIG.UPDATE_CHAT_INTERVAL_MS);
        return () => clearInterval(id);
    }, [server, store]);

    const handleSendMessage = () => {
        const text = newMessage.trim();
        if (!text) return;
        server.sendMessage(text).then((ok) => {
            if (ok) {
                setNewMessage("");
                if (inputRef.current) {
                    inputRef.current.style.height = "auto";
                }
            }
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    };

    const onlineUsers = users.filter(user => user.isOnline);
    const onlineCount = onlineUsers.length;

    return (
        <div className="chat-container">
            <div className="chat-card">
                <div className="chat-main">
                    <div className="chat-header">
                        <h2 className="chat-title">Общий чат</h2>
                    </div>

                    <div className="messages-container" ref={messagesContainerRef}>
                        {messages.map((message) => (
                            <div 
                                key={message.id} 
                                className={`message ${message.isOwn ? 'own-message' : ''}`}
                            >
                                <div className="message-header">
                                    <span className="message-author">{message.author}</span>
                                    <span className="message-time">{message.time}</span>
                                </div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="message-input-container">
                        <div className="message-input-wrapper">
                            <textarea
                                ref={inputRef}
                                className="message-input-field"
                                placeholder="Напишите сообщение..."
                                value={newMessage}
                                onChange={handleTextareaChange}
                                onKeyPress={handleKeyPress}
                                rows={1}
                            />
                            <button 
                                className="send-button"
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
                <div className="users-sidebar">
                    <div className="sidebar-header">
                        <div className="sidebar-title">
                            Онлайн <span className="online-count">{onlineCount}</span>
                        </div>
                    </div>

                    <div className="users-list">
                        {onlineUsers.map((user) => (
                            <div key={user.id} className="user-item">
                                <span className="user-status online"></span>
                                <span className="user-name">{user.name}</span>
                            </div>
                        ))}
                        {onlineUsers.length === 0 && (
                            <div className="user-item user-item-empty">
                                Нет пользователей онлайн
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="background-effects">
                <div className="gradient-circle circle-1"></div>
                <div className="gradient-circle circle-2"></div>
            </div>
        </div>
    );
}

export default Chat;