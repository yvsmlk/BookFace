
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
import SearchBar from '../Components/Search/SearchBar'
import BottomNavigationBar from '../Components/BottomNavigationBar/BottomNavigationBar'







const Home = () => {
  const [isMobile, setIsMobile] = React.useState(false);

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
      
      <div className=' flex flex-1  overflow-scroll 'style={backgroundImageStyle}>
            {isMobile ? (
        <BottomNavigationBar children={undefined} />
      ) : (
        <SideBar children={undefined} />
      )} 
        <section className="flex flex-wrap mt-2 md:flex-1">
  <div className="w-full md:w-5/5 xl:flex-1">
    <div className="mb-2 md:ml-2 xl:ml-0">
      <VCard name="John Doe" username="johndoe" followers={1000} following={500} />
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <Followings suggestions={people} />
    </div>
  </div>
  <div className=" min-h-screen mx-auto overflow-hidden w-full md:w-4/5 xl:flex-1">
    <div className="mb-2 md:ml-2 xl:ml-0">
      <PostCard profilePictureUrl="https://randomuser.me/api/portraits/women/8.jpg" />
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <Publication
        data={{
          id: 0,
          author: {
            name: "John Doe",
            username: "johndoe",
            avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg"
          },
          content:
            "Ces services permettent de trouver les sources des photographies et donc de mieux comprendre les restrictions d’usage des images trouvées ici et là sur Internet. Dans tous les cas, méfiez-vous des images trop « parfaites » : généralement issues de banques d’images, leur utilisation est rarement gratuite !",
          imageUrl: undefined,
          videoUrl: undefined,
          postedAt: "",
          likes: 0,
          shares: 0,
          comments: 0
        }}
      />
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <Publication
        data={{
          id: 0,
          author: {
            name: "Carla Davis",
            username: "carladavis",
            avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg"
          },
          content: undefined,
          imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
          videoUrl: undefined,
          postedAt: "",
          likes: 0,
          shares: 0,
          comments: 0
        }}
      />
    </div>
  </div>
  <div className="w-full md:w-5/5 xl:flex-1">
    <div className="mb-2 md:ml-2 xl:ml-0">
      <SearchBar />
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <NatureCard />
    </div>
    <div className="mb-2 md:ml-2 xl:ml-0">
      <NatureTrendCard />
    </div>
  </div>
</section>




       
      
     </div>
    )
  }

  export default Home