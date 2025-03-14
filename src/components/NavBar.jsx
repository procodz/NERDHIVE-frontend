import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          // Only navigate to login if not on homepage
          if (!isHomePage) {
            navigate('/login');
          }
        }
      }
    };

    if (!user) {
      checkAuth();
    }
  }, [dispatch, navigate, user, location.pathname, isHomePage]);

  const logoutHandler = async() => {
    try {
      await axios.post(BASE_URL + "/logout", {}, 
        { withCredentials: true }
      );
      localStorage.removeItem('user');
      dispatch(removeUser());
      dispatch(removeUserFromFeed());
      return navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userData = user?.user?.user || user;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-base-100 shadow-md z-[45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gradient">NERD<span className="text-accent">HIVE</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <>
                <span className="text-accent/90 text-sm">Welcome, {userData.firstName}</span>
                
                {/* <Link to="/feed" className="text-base-content/80 hover:text-accent text-sm transition-colors px-3 py-1">
                  Feed
                </Link> */}
                
                <Link to="/projects" className="text-base-content/80 hover:text-accent text-sm transition-colors px-3 py-1">
                  Projects
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-base-content/80 hover:text-accent text-sm transition-colors px-3 py-1">
                    <span>Account</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-1 w-48 bg-base-200/90 backdrop-blur-sm rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                      Profile
                    </Link>
                    <Link to="/user/connections" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                      Connections
                    </Link>
                    <Link to="/user/request/received" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                      Requests
                    </Link>
                    <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm hover:bg-red-400/10 hover:text-red-400 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
                
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-accent/50 hover:ring-accent transition-all">
                    <img
                      className="h-full w-full object-cover"
                      src={userData.photoUrl}
                      alt={`${userData.firstName} ${userData.lastName}`}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-transparent border border-accent text-base-content hover:bg-accent/20 hover:text-accent px-4 py-1.5 rounded-md text-sm font-normal transition-all">
                  Login
                </Link>
                <Link to="/login" className="bg-transparent border border-accent text-base-content hover:bg-accent/20 hover:text-accent px-4 py-1.5 rounded-md text-sm font-normal transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {userData ? (
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-blue-300 focus:outline-none"
              >
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="bg-transparent border border-accent text-base-content hover:bg-accent/20 hover:text-accent px-3 py-1 rounded-md text-sm font-normal transition-all">
                  Login
                </Link>
                <Link to="/login" className="bg-transparent border border-accent text-base-content hover:bg-accent/20 hover:text-accent px-3 py-1 rounded-md text-sm font-normal transition-all">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-base-200/95 backdrop-blur-sm shadow-lg rounded-b-lg">
          {userData && (
            <>
              <div className="px-4 py-2 text-accent/90 text-sm border-b border-base-300/50">
                Welcome, {userData.firstName}
              </div>
              <Link to="/feed" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                Feed
              </Link>
              <Link to="/projects" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                Projects
              </Link>
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                Profile
              </Link>
              <Link to="/user/connections" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                Connections
              </Link>
              <Link to="/user/request/received" className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors">
                Requests
              </Link>
              <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm hover:bg-red-400/10 hover:text-red-400 transition-colors">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;