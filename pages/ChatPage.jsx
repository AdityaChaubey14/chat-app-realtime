import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import UserList from '../components/UserList';
import MessageInput from '../components/MessageInput';
import '../styles/Chat.css';

export default function ChatPage({ user, onLogout }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', senderId: 2, text: 'Hey! How are you?', timestamp: new Date(Date.now() - 60000) },
    { id: 2, sender: user.username, senderId: user.id, text: 'Hi! I\'m doing great!', timestamp: new Date(Date.now() - 30000) },
  ]);
  const [users, setUsers] = useState([
    { id: 2, username: 'John' },
    { id: 3, username: 'Sarah' },
    { id: 4, username: 'Mike' },
  ]);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const handleSendMessage = (text) => {
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
