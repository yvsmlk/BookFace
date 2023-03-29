
import React from 'react'
import Followings from '../Components/Followings/Followings'
import people from "../Components/Followings/people"
import PostCard from "../Components/Postcard/Postcard"

import VCard from "../Components/VCard/VCard"
import NatureTrendCard from "../Components/NatureTrendCard/NatureTrendCard"
import Publication from "../Components/Publication/Publication"
import SideBar from '../Components/SideBar/SideBar'
import NatureCard from '../Components/GalleryCard/GalleryCard'
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'







const Home = () => {

    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover', 

      };

    return (
      
      <div className=' flex flex-1 justify-between 'style={backgroundImageStyle}>
           <SideBar children={undefined}/>   
        <section className="flex flex-1 flex-wrap gap-3 mt-2 ">
                 <div className=" flex-1 ">
                    <div className=''><VCard name="John Doe" username="johndoe" followers={1000} following={500} />   </div>
                    <div className=''> <Followings suggestions={people} /></div>

                 </div>

                  <div className=" flex-1 space-y-2">
                    <div className=''>  <PostCard profilePictureUrl="https://randomuser.me/api/portraits/women/8.jpg" /></div>
                    <div className=''> <Publication data={{
            id: 0,
            author: {
                name: "John Doe",
                username: "johndoe",
                avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg"
            },
            content: "Ces services permettent de trouver les sources des photographies et donc de mieux comprendre les restrictions d’usage des images trouvées ici et là sur Internet. Dans tous les cas, méfiez-vous des images trop « parfaites » : généralement issues de banques d’images, leur utilisation est rarement gratuite !",
            imageUrl: undefined,
            videoUrl: undefined,
            postedAt: "",
            likes: 0,
            shares: 0,
            comments: 0
        }} /></div>
                    <div> <Publication data={{
            id: 0,
            author: {
                name: "John Doe",
                username: "johndoe",
                avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg"
            },
            content: "Ces services permettent de trouver les sources des photographies et donc de mieux comprendre les restrictions d’usage des images trouvées ici et là sur Internet. Dans tous les cas, méfiez-vous des images trop « parfaites » : généralement issues de banques d’images, leur utilisation est rarement gratuite !",
            imageUrl: undefined,
            videoUrl: undefined,
            postedAt: "",
            likes: 0,
            shares: 0,
            comments: 0
        }} /></div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className=''><NatureCard/></div>
                    <div className=''><NatureTrendCard /></div>




                  </div>
        </section>


       
      
     </div>
    )
  }

  export default Home