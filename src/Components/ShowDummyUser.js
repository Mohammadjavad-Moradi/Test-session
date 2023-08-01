import { useState, useEffect } from 'react';

import UserData from './UserData/UserData';

import { fetchUser, handleClick } from './ShowDummyUser.helpers';

const ShowDummyUser = () => {
  const [user, setUser] = useState(null);
  const [hasError, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    fetchUser({setUser, setError, currentId});
  }, [currentId]);

  return (
    <div>
      { hasError ? <h1>{hasError}</h1> : null}

      { user ? <UserData user={user}/> : <h1>no user</h1>}
      
      { currentId < 3 ? 
        <button onClick={handleClick({setUser, setError, setCurrentId, currentId})}>Get user</button>
        : <p>no any other user remains</p>
      }
    </div>
  )
};

export default ShowDummyUser;