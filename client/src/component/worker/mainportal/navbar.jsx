import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes,faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-row items-center justify-around border-b border-gray-300 p-4">
      <button onClick={handleToggleMenu} className="focus:outline-none">
        <FontAwesomeIcon icon={showMenu ? faTimes : faBars} size="lg" className="text-black" />
      </button>
      <div>
        <h2 className='font-mono'>
          JERRY COMPANY LIMITED
        </h2>
      </div>
      <div>
      <FontAwesomeIcon icon={faUser} size="lg" className="text-gray-500 rounded-full border border-gray-500 p-1" />
      </div>
      {showMenu && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-50 p-4">
          <ul>
            <li>Check In - Today</li>
            <li>Check-out</li>
            <li>Attendance record sheet</li>
          </ul>
        </div>
      )}


    </div>
  );
};

export default Navbar;
