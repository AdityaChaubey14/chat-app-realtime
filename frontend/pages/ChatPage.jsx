import { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import UserList from '../components/UserList';
import MessageInput from '../components/MessageInput';
import '../styles/Chat.css';

export default function ChatPage({ user, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch users and messages
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (text) => {
        // We'll add real API call here later
        const newMessage = {
            id: Date.now(),
            sender: user.username,
            senderId: user.id,
            text,
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <h2>💬 Chat</h2>
                    <button onClick={onLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
                <UserList
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                    currentUser={user}
                />
            </div>

            <div className="chat-main">
                <div className="chat-header">
                    <h3>
                        {selectedUser
                            ? `Chat with ${selectedUser.username}`
                            : '👋 Select a user to start chatting'}
                    </h3>
                </div>

                <ChatWindow messages={messages} currentUser={user} />
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}