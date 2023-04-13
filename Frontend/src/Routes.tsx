import { Routes, Route } from "react-router-dom"
import Followings from "./Components/Followings/Followings"
import people from "./Components/Followings/people"
import PostCard from "./Components/Postcard/Postcard"
import SideBar from "./Components/SideBar/SideBar"
import VCard from "./Components/VCard/VCard"
import LandingPage from './Pages/LandingPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"


import NatureCard from "./Components/GalleryCard/GalleryCard"
import NatureTrendCard from "./Components/NatureTrendCard/NatureTrendCard"
import Publication from "./Components/Publication/Publication"
import Home from "./Pages/Home"
import SearchBar from "./Components/Search/SearchBar"

import Notifications from "./Pages/Notifications"
import { APIDoc } from "./Pages/API"

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
            <Route path='/Home' element={<Home />} />
        
         
          
            <Route path= '/Register' element={<Register/>} />
            <Route path= '/Login' element={<Login/>} />
            
            <Route path= '/Notifications' element={<Notifications/>} />
          
          
            <Route path= '/api-doc' element={<APIDoc/>} />
        
    </Routes>
}
