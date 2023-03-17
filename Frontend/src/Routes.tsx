import { Routes, Route } from "react-router-dom"
import LandingPage from './Pages/LandingPage'



export function routes() {
    return <Routes>
            <Route path='/LandingPage' element={<LandingPage />} />

    </Routes>
}
