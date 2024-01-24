import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import StaticPage from './frontpage';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
    setShowUserMenu(false);
  };

  const handleToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div>
      <div className="flex flex-row items-center justify-around border-b border-gray-300 p-4 relative">
        <button
          onClick={handleToggleMenu}
          className="focus:outline-none relative z-20"
        >
          <FontAwesomeIcon
            icon={faBars}
            size="x"
            className="text-black bg-gray-100 rounded-full border p-2"
          />
        </button>
        <div>
          <h2 className="font-mono md:text-base text-sm">JERRY COMPANY LIMITED</h2>
        </div>
        <div className="relative" ref={userMenuRef}>
          <button onClick={handleToggleUserMenu} className="focus:outline-none">
            <FontAwesomeIcon
              icon={faUser}
              size="x"
              className="text-gray-500 rounded-full border border-gray-500 p-1"
            />
          </button>
        </div>
        {showMenu && (
          <div
            className="fixed top-0 left-0 h-full w-64 bg-gray-50 p-4 sm:h-full"
            style={{ zIndex: 1000 }}
          >
            <ul className="flex flex-col items-center justify-center h-full gap-24 overflow-y-scroll overflow-x-hidden md:items-start md:justify-center md:pb-80 lg:pb-96 ">
              <li>
                <button className="text-black p-2 w-56 sm:w-56 text-center hover:bg-white hover:border hover:border-gray-300 rounded-md">
                  Check In - Today
                </button>
              </li>
              <li>
                <button className="text-black p-2 w-56 text-center hover:bg-white hover:border hover:border-gray-300 rounded-md">
                  Check-out
                </button>
              </li>
              <li>
                <button className="text-black p-2 w-56 text-center hover:bg-white hover:border hover:border-gray-300 rounded-md">
                  Attendance record
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <StaticPage />
    </div>
  );
};

export default Navbar;
