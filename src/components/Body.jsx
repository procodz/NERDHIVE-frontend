import { useEffect, memo } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import Particles from './Particles';
import Sidebar from './Sidebar';

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
    <div className="min-h-screen bg-base-100 text-base-content relative">
      {isHomePage && <MemoizedParticles density={25} speed={0.5} color="#32CD32" opacity={0.2} />}
      
      {/* Navbar with highest z-index */}
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      <div className="flex relative">
        {/* Sidebar with higher z-index than main content */}
        {userData && !isHomePage && (
          <aside className="z-40">
            <Sidebar />
          </aside>
        )}
        
        {/* Main content */}
        <main className={`flex-grow min-h-screen px-4 sm:px-6 lg:px-8 relative z-30
          ${userData && !isHomePage ? 'lg:ml-64' : ''}`}>
          <div className="pt-16">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer with appropriate z-index */}
      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  );
};

export default Body;