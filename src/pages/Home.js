import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('New room has been created.');  
  };

  const joinRoom = () => {
    if (!roomId && !username) {
      toast.error('ROOM ID & USERNAME is required');
      return;
    }
    if (!roomId) {
        toast.error('ROOM ID is required');
        return;
    }
    if (!username) {
      toast.error('USERNAME is required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      // THIS IS THE WAY TO PASS DATA FROM ONE ROUTE TO ANOTHER ROUTE, FUNCTION OF REACT ROUTER DOM
        state: {
            username,
        },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
        joinRoom();
    }
  };


  return (
  <div className='homePageWrapper'>
    <div className='formWrapper'>
      <img className='homePageLogo' src="/codeCollab.png" alt="codeCollab" />
      <h4 className='mainLabel'>Unlock The Code Chamber</h4>
      <div className='inputGroup'>
        <input 
        type='text' 
        className='inputBox' 
        placeholder='ROOM ID' 
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
        onKeyUp={handleInputEnter}
        />
        <input 
        type='text' 
        className='inputBox' 
        placeholder='USERNAME'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyUp={handleInputEnter}
        />

        <button className='btn joinBtn' onClick={joinRoom}>Join</button>
        <span className='createInfo'>
          Don't have any invitations. Don't worry &nbsp;
          <a onClick={createNewRoom} href='' className='createNewBtn'>
            create one
          </a>
        </span>
      </div>
    </div>
    <footer>
      <h4>Enjoy Coding Together</h4>
    </footer>
  </div>

  );
};

export default Home;
