import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaEnvelope, FaCog, FaNewspaper, FaBlog, FaBars, FaTimes, FaUserFriends  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Sidebar = () => {
  const user = useSelector((store) => store.user) || {};
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  if(user) {
    return (
      <div className="relative ">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-[4.5rem] left-4 z-[60] p-2.5 rounded-lg bg-primary text-white lg:hidden hover:bg-primary-focus shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Sidebar */}
        <div className={`
          bg-base-200 w-64 min-h-screen fixed left-0 top-0 
          shadow-xl overflow-y-auto transition-all duration-300 ease-in-out
          z-[40] pt-16 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Sidebar Header */}
          <div className="px-6 py-4 border-b border-base-300">
            {/* <h2 className="text-xl font-bold text-gradient">NERD<span className="text-accent">HIVE</span></h2> */}
            <p className="text-sm text-base-content/60 mt-1 text-center text-gradient">Developer Hub</p>
          </div>

          {/* Navigation Menu */}
          <div className="p-4">
            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                Main Menu
              </h3>
              <ul className="menu menu-md gap-1 mt-2">
                <li>
                <Link 
                    to="/feed" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/feed') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserFriends className="text-lg text-accent" />
                    Feed
                  </Link>
                  <Link 
                    to="/openSource" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/openSource') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaGithub className="text-lg text-accent" />
                    Open Source Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/inbox" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/inbox') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaEnvelope className="text-lg text-accent" />
                    Inbox
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="menu menu-md gap-1 mt-2">
                <li>
                  <Link 
                    to="/tech-news" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/tech-news') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaNewspaper className="text-lg text-accent" />
                    Tech News
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blogs" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/blogs') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaBlog className="text-lg text-accent" />
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                User
              </h3>
              <ul className="menu menu-md gap-1 mt-2">
                <li>
                  <Link 
                    to="/profile" 
                    className={`flex text-accent items-center gap-3 px-4 py-2.5 hover:bg-base-300 transition-colors
                      ${isActiveRoute('/profile') ? 'bg-primary/10 text-primary font-medium' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaCog className="text-lg text-accent" />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-[35]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }
  return null;
};

export default Sidebar;