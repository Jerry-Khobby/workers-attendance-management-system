import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    // changing the icon from hamburger to cross
const [crossIcon,setCrossIcon]=useState(false);

const handleCrossIcon=()=>{
setCrossIcon(true);
}

  return (
    <div className="flex flex-row items-center justify-around border-b border-gray-300 p-4">
      <div>
        <FontAwesomeIcon icon={faBars} size="x" className="text-black bg-gray-300 rounded-full p-2" />
      </div>
      <div>
        <h2 className='font-mono'>
          JERRY COMPANY LIMITED
        </h2>
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} size="x" className="text-gray-500 rounded-full border border-gray-500 p-1" />
      </div>
    </div>
  );
};

export default Navbar;
