import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { SidebarData } from './SideBarData';
import {FaHome, FaUser, FaBell, FaBookmark} from 'react-icons/fa' 
import { ResponseMsg } from '../../utils/typess';
import { toast } from 'react-toastify';
import { IoExitOutline } from "react-icons/io5";

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const fetchDisconnect = ()=>{
  let url = `${PRODUCTION}/logout`

  let option = {
    method: 'POST',
    credentials: "include" as RequestCredentials,
  }
  
  return new Promise<ResponseMsg>(async (resolve, reject) => {

    try {

      let response = await fetch(url,option)
      let data:ResponseMsg = await response.json()

      resolve(data) 
      
    } catch (err) {
      resolve({
        status:404,
        message:"System error",
        content: {err}
      }) 
    }
    
  })
}

const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const navHome = ()=>{
    navigate("/Home")
  }

  const navProfile = ()=>{
    navigate("/Profile")
  }

  // const navNotifications = ()=>{
  //   navigate("/Notifications")
  // }

  // const navBookMark = ()=>{
  //   navigate("/Bookmark")
  // }

  const navDisconnect = ()=>{

    fetchDisconnect()
    .then((response)=>{
      if (response.status == 100){
        navigate("/Login")
      }
      else{
        toast.error("Error", {
          position: "top-center",
          hideProgressBar:true,
          pauseOnHover:true,
          autoClose: 5000
        })
      }

    })
    .catch(()=>{
      toast.error("Error", {
        position: "top-center",
        hideProgressBar:true,
        pauseOnHover:true,
        autoClose: 5000
      })

    })

  }

  return (
    <div className=" min-h-screen ">
      <div
        
        className=" h-full  bg-green-700 text-white py-8 px-4 "
      >
        <div className=" flex justify-between gap-4 items-center mb-8 select-none">
          {isOpen&&<h1 className='text-xl font-bold'>PHYSYS</h1>}
          <div className=' cursor-pointer'> <FaBars onClick={toggle} /></div>
        </div >

        <div className=' flex flex-col gap-4'>
          {isOpen?<p onClick={()=>navHome()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Home</p>:<FaHome onClick={()=>navHome()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaHome>}
          {isOpen?<p onClick={()=>navProfile()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Profile</p>:<FaUser onClick={()=>navProfile()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaUser>}
          {/* {isOpen?<p onClick={()=>navNotifications()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Notifications</p>:<FaBell onClick={()=>navNotifications()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaBell>}
          {isOpen?<p onClick={()=>navBookMark()} className=' cursor-pointer select-none font-bold hover:text-green-900'>BookMark</p>:<FaBookmark onClick={()=>navBookMark()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaBookmark>} */}
          {isOpen?<p onClick={()=>navDisconnect()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Disconnect</p>:<IoExitOutline onClick={()=>navDisconnect()} className=' cursor-pointer select-none font-bold hover:text-green-900'></IoExitOutline>}

        
        </div>
        {/* {SidebarData.map((item, index) => (
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
        ))} */}
      </div>
      {/* <main className="ml-0 sm:ml-50">{children}</main> */}
    </div>
  );
};

export default SideBar;


