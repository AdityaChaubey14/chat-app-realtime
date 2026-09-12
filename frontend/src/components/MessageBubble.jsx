import '../styles/MessageBubble.css';

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
      <div className="message-content">
        <p className="message-sender">{message.sender}</p>
        <p className="message-text">{message.text}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
