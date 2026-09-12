import '../styles/UserList.css';

export default function UserList({ users, selectedUser, onSelectUser, currentUser }) {
  return (
    <div className="user-list">
      {users.filter((u) => u.id !== currentUser.id).length === 0 ? (
        <p className="empty-list">👥 No users yet</p>
      ) : (
        users
          .filter((u) => u.id !== currentUser.id)
          .map((user) => (
            <div
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => onSelectUser(user)}
            >
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <p className="user-name">{user.username}</p>
                <p className="user-status">🟢 Online</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
}
