import { Routes, Route } from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"




export function routes() {
    return <Routes>

        
            <Route path='/' element={<LandingPage />} />

            <Route path= '/Register' element={<Register/>} />
            <Route path= '/Login' element={<Login/>} />
          
        
    </Routes>
}
