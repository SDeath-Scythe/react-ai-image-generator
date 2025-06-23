import React, { useState, useEffect } from 'react';

const Cardsapi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/users');
        const json = await res.json();
        setUsers(json);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const updatedActive = !user.active;

      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: updatedActive,
                                
                                
         }),
      });

      if (!res.ok) {
        throw new Error('Failed to update user status on server');
      }

      setUsers(users.map(u =>
        u.id === userId ? { ...u, active: updatedActive } : u
      ));
    } catch (error) {
      console.error(error);
      alert('Could not update user status. Please try again.');
    }
  };

  return (
    <div className="">
      

      {loading ? (
        <p>⏳ Loading users...</p>
      ) : (
        <div className="cards-container">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.role}</p>
              <button onClick={() => toggleUserStatus(user.id)} className="status-button">
                {user.active ? (
                  <span className="active">Active ✅</span>
                ) : (
                  <span className="inactive">Inactive ❌</span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cardsapi;
