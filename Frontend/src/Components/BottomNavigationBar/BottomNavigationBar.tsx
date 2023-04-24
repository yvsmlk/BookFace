import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SidebarData } from '../SideBar/SideBarData';
import { FaHome, FaUser } from 'react-icons/fa';
import { ResponseMsg } from '../../utils/Types';
import { toast } from 'react-toastify';
import { IoExitOutline } from "react-icons/io5";


const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const fetchDisconnect = ()=>{
  let url = `${DEVELOP}/logout`

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


const BottomNavigationBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const navigate = useNavigate()

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
    <div className=" sticky bottom-0 w-full z-50 lg:hidden bg-green-700 text-white py-1 px-2">
      <div className="flex gap-8 p-2 justify-center">
        {/* {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex-1 flex flex-col items-center py-2 px-4 text-center hover:bg-green-700 hover:text-white"
            activeClassName="active"
          >
            <div className="text-xl">{item.icon}</div>
            <div className="mt-1 text-xs">{item.title}</div>
          </NavLink>
        ))} */}

        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <FaHome onClick={()=>navHome()} className=' h-6  w-6 '></FaHome>
          Home
        </div>
        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <FaUser onClick={()=>navProfile()} className=' h-6  w-6 '></FaUser>
          Profile
        </div>
        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <IoExitOutline onClick={()=>navDisconnect()} className=' h-6  w-6 '></IoExitOutline>
          Disconnect
        </div>
      {/* <FaBell onClick={()=>navNotifications()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaBell>
      <FaBookmark onClick={()=>navBookMark()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaBookmark> */}
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
};

export default BottomNavigationBar;
