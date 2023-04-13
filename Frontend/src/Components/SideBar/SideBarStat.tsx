import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBell, FaBookmark, FaEllipsisV } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';



  const SideBarStat = () => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 820px)'
    });
  
    if (isDesktopOrLaptop) {

  return (
    <div className="bg-green-50 text-green-900 h-screen px-4 duration-500 ease-in-out">
      <div className="px-16 py-12">
        <div className="flex justify-between items-center pt-20 mb-10 mr-14"><FaHome />
          <Link to="/Home" className="text-xl font-semibold text-gray-700 hover:text-green-500">Home</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-14"><FaUser />
          <Link to="/ProfileCard" className="text-xl font-semibold text-gray-700 hover:text-green-500">Profile</Link>
        </div>
        <div className="flex justify-between items-center mb-10"><FaBell className="inline-block mr-3" />
          <Link to="/Notifications" className="text-xl font-semibold text-gray-700 hover:text-green-500">Notifications</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-5"><FaBookmark />
          <Link to="/BookMarks" className="text-xl font-semibold text-gray-700 hover:text-green-500">BookMark</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-16"><FaEllipsisV />
          <Link to="/More" className="text-xl font-semibold text-gray-700 hover:text-green-500">More</Link>
        </div>
      </div>
    </div>
  );
} else {
  return null;
 }
}
  
  export default SideBarStat;