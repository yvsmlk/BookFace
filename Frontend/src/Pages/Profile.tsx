import React, { useEffect } from 'react';
import { useState } from 'react';
// import PostData from "../Components/Publication/PostData";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import classNames from 'classnames';
import Publication from '../Components/Publication/Publication';
import SideBarStat from '../Components/SideBar/SideBarStat';

import GreenWave2 from '../images/GreenWave2.jpg'
import BottomNavigationBar from '../Components/BottomNavigationBar/BottomNavigationBar';
import SideBar from '../Components/SideBar/SideBar';
import VCard from '../Components/VCard/VCard';
import Feed from '../Components/Publication/Feed';
import { FeedType } from '../utils/Types';

// interface ProfileCardProps {
//     data: PostData;
//   }

type buttonProps = {
    text:string, 
    activeButton:string, 
    setActiveButton:React.Dispatch<React.SetStateAction<string>>
}

const S_BUTTON = ({text, activeButton, setActiveButton}:buttonProps)=>{

    let font_size = text == activeButton? 'font-bold' : 'font-light '
    let color = text == activeButton? 'text-green-700' : 'text-neutral-700'
    let border_bottom = text == activeButton? ' border-b-4 rounded-b-sm border-green-700' : ''

    return (
        <button className={`flex justify-center items-center h-[75%] ${color} ${font_size}
        select-none cursor-pointer rounded-t-md p-2 ${border_bottom}`}
        onClick={()=>setActiveButton(text)}>
            {text}
        </button>
    )
}

const SPIN1 = ()=>{
    return (
        <div className=" flex w-full justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="green" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                </path>
            </svg>
        </div>
    )
}


    const Profile = () => {

    const [active, setActive] = useState(0);

    const [post, setPost] = useState('');
    const [post1, setPost1] = useState<null | React.ReactNode>(null);
    const [post2, setPost2] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [rerender_feed_VCard,setRerenderFeedVCard] = useState(0)
    const [activeButton, setActiveButton] = useState('Bookmarks')
    const [rerender_feed,setRerenderFeed] = useState(0)
    const [loading, setLoading] = useState(true);
    const [reRender, setRerender] = useState(0)
    
    // const [rerender_feed,setRerenderFeed] = useState(0)
    // const [rerender_feed_VCard,setRerenderFeedVCard] = useState(0)

    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover',

    };

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); 
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className=' flex flex-col flex-1 md:flex-row  min-h-screen' style={backgroundImageStyle}>
      
        {
          !isMobile && <SideBar children={undefined} />
          
        }

        <div className=' flex flex-col md:flex-[0_1_300px] gap-4  p-4'>
            <VCard vCardRerender={rerender_feed_VCard}/>
        </div>
        <div  className=" flex-1 flex flex-col p-3 ">
            <div className=" flex items-end gap-8 flex-[0_1_5%] pl-2 ">
                <S_BUTTON text="Bookmarks" activeButton={activeButton} setActiveButton={setActiveButton}/>
                <S_BUTTON text="Posts" activeButton={activeButton} setActiveButton={setActiveButton}/>
                <S_BUTTON text="Community" activeButton={activeButton} setActiveButton={setActiveButton}/>

            </div>
            <div className=" flex-[0_1_95%] rounded-lg p-3">
                {
                    activeButton == "Bookmarks" && <Feed type={2} rerender_feed={rerender_feed} isReg={true} ></Feed>
                }
                {
                    // loading?<SPIN1/>:<Feed type={2} rerender_feed={rerender_feed} isReg={true} ></Feed>
                    activeButton == "Posts" && <div></div>
                }
                {
                    activeButton == "Community" && <Feed type={3} rerender_feed={rerender_feed} isReg={true} ></Feed>
                }
            </div>
        </div>
        
        {
          isMobile && <BottomNavigationBar children={undefined} />
          
        }
        

      </div>
      


        );
}



export default Profile;