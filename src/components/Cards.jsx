import React, { useState,useEffect, use } from 'react'
import data from '../data.json'

const storageKey = 'usersData';
const Cards = () => {

const [users, setUsers] = useState(() => {
  const storedUsers = localStorage.getItem(storageKey);
  return storedUsers ? JSON.parse(storedUsers) : data;
});

const [loading, setLoading] = useState(false);

useEffect(()=>{
  const fetchData = async () => {
    setLoading(true);

    setTimeout(() => {
      setUsers(data);
      setLoading(false);

    }, 1000);
  };
  fetchData();
},[]);


useEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(users));
}, [users]);

  return (
    <div>
      <div className='cards-container'>
        {
          users.map((user, index) => (
            <div className='user-card' key={index}>

              <h2>{user.name} </h2>

              <p>{user.role}</p>

              
              <button onClick={() => {
                setUsers(users.map((u) =>
                  u.id === user.id ? { ...u, active: !u.active } : u
                ));
              }} className='status-button'>

                {user.active ? 
                <span className='active'>Active ✅</span> : 
                <span className='inactive'>Inactive ❌</span>
                }
              </button>
                
              


            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Cards;