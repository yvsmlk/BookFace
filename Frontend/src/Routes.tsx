import { Routes, Route } from "react-router-dom"
import Followings from "./Components/Followings/Followings"
import people from "./Components/Followings/people"
import PostCard from "./Components/Postcard/Postcard"
import SideBar from "./Components/SideBar/SideBar"
import VCard from "./Components/VCard/VCard"
import ModalCookies from "./Components/ModalCookies/ModalCookies"
import LandingPage from './Pages/LandingPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import ProfileCard from "./Components/ProfileCard/ProfileCard"


import NatureCard from "./Components/GalleryCard/GalleryCard"
import NatureTrendCard from "./Components/NatureTrendCard/NatureTrendCard"
import Publication from "./Components/Publication/Publication"
import Home from "./Pages/Home"
import SearchBar from "./Components/Search/SearchBar"

import Notifications from "./Pages/Notifications"
import { APIDoc } from "./Pages/API"
import Profile from "./Pages/Profile"

let example_User = {
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
}



export function routes() {
    return <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path= '/Register' element={<Register/>} />
            <Route path= '/Login' element={<Login/>} />
            {/* <Route path= '/ModalCookies' element={<ModalCookies/>} /> */}
            <Route path='SideBar/' element={<SideBar isOpen={true} />} />
            <Route path='SideBarStat/' element={<SideBar isOpen={true} />} />
            <Route path='/VCard' element={<VCard name="John Doe" username="johndoe" followers={1000} following={500} />} />
            <Route path='/Followings' element={<Followings suggestions={people} />} />
            <Route path='/post' element={<PostCard profilePictureUrl="https://randomuser.me/api/portraits/women/8.jpg" />} />
            <Route path='NatureCard/' element={<NatureCard />} />
            <Route path='Profile/' element={<Profile data={{
            id: 0,
            author: {
                name: "",
                username: "",
                avatarUrl: ""
            },
            profileDescription: undefined,
            address: undefined,
            country: undefined,
            content: undefined,
            imageUrl: undefined,
            videoUrl: undefined,
            postedAt: "",
            following: 0,
            followedBy: undefined,
            followers: 0,
            likes: 0,
            shares: 0,
            comments: 0
        }} />} />
            <Route path='NatureTrendCard/' element={<NatureTrendCard />} />
            <Route path='/ProfileCard' element={<ProfileCard data={{
                id: 0,
                author: {
                name: "John Doe",
                username: "johndoe",
                avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg"
                

                },

                profileDescription: "Passionate traveler and amateur photographer exploring the world one shot at a time. Always seeking new adventures and experiences.",
                address: "123 Main St.",
                country: "USA",
                following: 100,
                followers: 500,
                followedBy: "Jane Smith, Bob Johnson and Mike Davis"

            }} />} />

            <Route path='Publication/' element={<Publication data={{
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
        }} />} />
            <Route path='/Home' element={<Home />} />
        
         
          
            <Route path= '/Register' element={<Register/>} />
            <Route path= '/Login' element={<Login/>} />
            
            <Route path= '/Notifications' element={<Notifications/>} />
          
          
            <Route path= '/api-doc' element={<APIDoc/>} />
        
    </Routes>
}
