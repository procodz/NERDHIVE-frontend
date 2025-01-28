import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser, removeUser } from '../utils/userSlice';
import { removeUserFromFeed } from '../utils/feedslice';

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          dispatch(addUser(JSON.parse(storedUser)));
        }

        // Then verify with server
        const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(addUser(res.data));
      } catch (err) {
        // Suppress error logging if on login page
        if (location.pathname !== '/login') {
          console.error("Auth check failed:", err);
        }
        if (err.response?.status === 401) {
          localStorage.removeItem('user');
          dispatch(removeUser());
          navigate('/login');
        }
      }
    };

    if (!user) {
      checkAuth();
    }
  }, [dispatch, navigate, user, location.pathname]);

  const logoutHandler = async() => {
    try {
      await axios.post(BASE_URL + "/logout", {}, 
        { withCredentials: true }
      );
      localStorage.removeItem('user');
      dispatch(removeUser());
      dispatch(removeUserFromFeed());
      return navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userData = user?.user?.user || user;

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to = "/feed" className="btn btn-ghost text-xl"><img src="src\img\nerdhive-logo-dark.svg" alt="NerdHive Logo" className="h-8" />NERDHIVE</Link>
      </div>
      {userData && (
        <div className="flex-none gap-2">
          <div className='form-control mx-3'>Welcome, {userData.firstName}</div>
          
          {/* Projects Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Projects
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
              <li>
                <Link to="/projects">My Projects</Link>
              </li>
              <li>
                <Link to="/projects/new">Create Project</Link>
              </li>
            </ul>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={userData.photoUrl} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/user/connections">Connections</Link>
              </li>
              <li>
                <Link to="/user/request/received">Requests</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;