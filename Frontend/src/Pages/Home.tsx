
import React, { useState } from 'react'
import Followings from '../Components/Followings/Followings'
import PostCard from "../Components/Postcard/Postcard"
import VCard from "../Components/VCard/VCard"
import NatureTrendCard from "../Components/NatureTrendCard/NatureTrendCard"
import Publication from "../Components/Publication/Publication"
import SideBar from '../Components/SideBar/SideBar'
import NatureCard from '../Components/GalleryCard/GalleryCard'
import GreenWave2 from '../images/GreenWave2.jpg'
import BottomNavigationBar from '../Components/BottomNavigationBar/BottomNavigationBar'

import { generateRandomPostData } from '../Components/Publication/PostData'
import Feed from '../Components/Publication/Feed'
import { Person, ResponseMsg, StatusTypes } from '../utils/typess'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [rerender_feed,setRerenderFeed] = useState(0)
  const [rerender_feed_VCard,setRerenderFeedVCard] = useState(0)

  const feedFRender = ()=>{
    setRerenderFeed(Math.random)
  }

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Modifier cette valeur en fonction de votre définition d'un écran de téléphone
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backgroundImageStyle = {
      backgroundImage: `url("${GreenWave2}")`,
      backgroundSize: 'cover', 

  };

    return (

      <div className=' flex flex-col md:flex-row ' style={backgroundImageStyle}>
      
        {
          !isMobile && <SideBar children={undefined} />
          
        }

        <div className=' flex flex-col md:flex-[0_1_300px] gap-4  p-4'>
          
          <VCard vCardRerender={rerender_feed_VCard}/>
          <Followings vCardRerender={setRerenderFeedVCard} />
          <NatureCard />
          {/* <div className=' flex-1 md:flex-[0_1_40%] bg-red-900'>
            <VCard/>
          </div>
          <div className=' flex-1'>
          </div> */}
        </div>
        <div className=' flex flex-col gap-4 md:flex-1  p-4  '>

          <div className=' flex-1'>
            <PostCard profilePictureUrl="" feedFRender={feedFRender} />
          </div>
          <Feed type={0} rerender_feed={rerender_feed} isReg={false} ></Feed>
        </div>
        {
          isMobile && <BottomNavigationBar children={undefined} />
          
        }

      </div>

    )
  }

  export default Home