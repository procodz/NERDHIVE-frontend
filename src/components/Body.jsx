import { useEffect, memo } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import Particles from './Particles';

// Memoize the Particles component to prevent unnecessary re-renders
const MemoizedParticles = memo(Particles);

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const isHomePage = location.pathname === '/';

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      // Only redirect to login if not on homepage and unauthorized
      if (err.response?.status === 401 && !isHomePage) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData && !isHomePage) {
      fetchUser();
    }
  }, [userData, dispatch, navigate, isHomePage, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Only show Particles animation on the homepage with memoized component */}
      {isHomePage && <MemoizedParticles density={25} speed={0.5} color="#32CD32" opacity={0.2} />}
      
      {/* NavBar at the top */}
      <NavBar />

      {/* Main content area with padding for the fixed navbar */}
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Outlet /> {/* This renders the nested routes */}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Body;