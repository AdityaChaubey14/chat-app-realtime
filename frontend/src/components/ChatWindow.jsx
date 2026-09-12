import MessageBubble from './MessageBubble';
import '../styles/ChatWindow.css';

export default function ChatWindow({ messages, currentUser }) {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="no-messages">📭 No messages yet</div>
      ) : (
        messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUser.id}
          />
        ))
      )}
    </div>
  );
}
