import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { SidebarData } from './SideBarData';


const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className=" min-h-screen ">
      <div
        
        className="sidebar h-full  bg-green-700 text-white py-8 px-4 transition-all duration-500 ease-in-out"
      >
        <div className=" flex justify-between gap-4 items-center mb-8">
          {isOpen&&<h1 className='text-xl font-bold'>PHYSYS</h1>}
          <div className=' cursor-pointer'> <FaBars onClick={toggle} /></div>
        </div >
        {SidebarData.map((item, index) => (
          <div className=' flex gap-4 h-[50px]'>
            <NavLink
              to={item.path}
              key={index}
              className=" flex justify-center items-center gap-4 hover:bg-green-700 hover:text-white"
            >
              <div className="icon"  >
                {item.icon}
              </div>
              <div
                style={{ display: isOpen ? 'block' : 'none' }}
                className="link_text ml-2"
              >
                {item.title}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
};

export default SideBar;


