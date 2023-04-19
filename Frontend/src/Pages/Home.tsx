
import React, { useState } from 'react'
import Followings from '../Components/Followings/Followings'
import people from "../Components/Followings/people"
import PostCard from "../Components/Postcard/Postcard"
import VCard from "../Components/VCard/VCard"
import NatureTrendCard from "../Components/NatureTrendCard/NatureTrendCard"
import Publication from "../Components/Publication/Publication"
import SideBar from '../Components/SideBar/SideBar'
import NatureCard from '../Components/GalleryCard/GalleryCard'
import GreenWave2 from '../images/GreenWave2.jpg'
import SearchBar from '../Components/Search/SearchBar'
import BottomNavigationBar from '../Components/BottomNavigationBar/BottomNavigationBar'

import { generateRandomPostData } from '../Components/Publication/PostData'
import Feed from '../Components/Publication/Feed'




const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [rerender_feed,setRerenderFeed] = useState(0)

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
      
      <div className=' flex flex-1 'style={backgroundImageStyle}>
            {isMobile ? (
        <BottomNavigationBar children={undefined} />
      ) : (
        <SideBar children={undefined} />
      )} 
        <section className="flex flex-wrap mt-2 md:flex-1">
  <div className="w-full md:w-5/5 xl:flex-1">
    <div className="mb-2 md:ml-2 xl:ml-0">
      <VCard/>
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <Followings suggestions={people} />
    </div>
  </div>
  <div className=" min-h-screen mx-auto overflow-hidden w-full md:w-4/5 xl:flex-1">
    <div className="mb-2 md:ml-2 xl:ml-0">
      <PostCard profilePictureUrl="" feedFRender={feedFRender} />
    </div>
  
    <div className="mb-2 md:ml-2 xl:ml-0">
      {/* <Publication
        data={generateRandomPostData()}
      /> */}
      <Feed type={0} rerender_feed={rerender_feed} tag=''></Feed>
    </div>
  </div>
  <div className="w-full md:w-5/5 xl:flex-1">
    {/* <div className="mb-2 md:ml-2 xl:ml-0">
      <SearchBar />
    </div> */}
    <div className="mb-2 md:ml-2 xl:ml-0">
      <NatureCard />
    </div>
    {/* <div className="mb-2 md:ml-2 xl:ml-0">
      <NatureTrendCard />
    </div> */}
  </div>
</section>




       
      
     </div>
    )
  }

  export default Home