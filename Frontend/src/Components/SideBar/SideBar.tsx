import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { SidebarData } from './SideBarData';


const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container w-40 min-h-screen z-50 ">
      <div
        style={{ width: isOpen ? '160px' : '50px' }}
        className="sidebar bg-green-700 text-white h-screen py-8 px-4 transition-all duration-500 ease-in-out"
      >
        <div className="top_section flex justify-between items-center mb-8">
          <h1
            style={{ display: isOpen ? 'block' : 'none' }}
            className="logo text-xl font-bold"
          >
            PHYSYS
          </h1>
          <div
            style={{ marginLeft: isOpen ? '50px' : '0px' }}
            className="bars cursor-pointer"
          >
            <FaBars onClick={toggle} />
          </div>
        </div >
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link flex items-center py-2 px-4 hover:bg-green-700 hover:text-white"
            
          >
            <div className="icon"  style={{ marginLeft: isOpen ? '-15px' : '0px' }}     >{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className="link_text ml-2"
            >
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
};

export default SideBar;


