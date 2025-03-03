import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const logoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, 
        { withCredentials: true }
      );
      dispatch(removeUser());
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local data even if the API call fails
      dispatch(removeUser());
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-transparent border border-red-400 text-red-400 hover:bg-red-400/10 px-3 py-1 rounded-md text-sm font-normal transition-all"
    >
      Logout
    </button>
  );
};

export default logoutHandler;