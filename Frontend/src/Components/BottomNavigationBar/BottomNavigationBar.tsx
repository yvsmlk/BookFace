import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../SideBar/SideBarData';

const BottomNavigationBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed bottom-0 w-full z-50 sm:hidden bg-green-700 text-white py-1 px-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">PHYSYS</h1>
        
      </div>
      <div className="flex">
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex-1 flex flex-col items-center py-2 px-4 text-center hover:bg-green-700 hover:text-white"
            activeClassName="active"
          >
            <div className="text-xl">{item.icon}</div>
            <div className="mt-1 text-xs">{item.title}</div>
          </NavLink>
        ))}
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
};

export default BottomNavigationBar;
