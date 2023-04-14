import {Link} from 'react-router-dom'
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'
import ModalCookies from '../Components/ModalCookies/ModalCookies';
import React, { useState, useEffect } from "react";



const LandingPage = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover', 

      };

    if (cookiesAccepted) {
      
      return (
  
        
        <div className="h-screen" style={backgroundImageStyle}>
          
        <div className="container mx-auto px-4 pt-16">
        <img src={GlobeImage} alt="" className="mx-auto mb-5 pt-8" style={{ height: "350px", width: "400px" }} />
          <h1 className="text-3xl font-bold text-center mb-5 text-green-800"> PHYSYS</h1>
          <p className="text-center text-xl mb-8 text-green-900">
             Express Yourself For A Greener Future!
          </p>
          <div className="flex justify-center mb-12">
            <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">
            <Link to="/Login">Log In</Link>
            </button>
            <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">
            <Link to="/Register">Sign In</Link>
            </button>
          </div>
        </div>
      </div>
    
      )
    }
    else{
      return (

        <div className="h-screen" style={backgroundImageStyle}>

          <div className = "h-screen absolute w-full">

            <ModalCookies setCookiesAccepted={setCookiesAccepted} cookiesAccepted={cookiesAccepted} />
          </div>
          
        <div className="container mx-auto px-4 pt-16">
        <img src={GlobeImage} alt="" className="mx-auto mb-5 pt-8" style={{ height: "350px", width: "400px" }} />
          <h1 className="text-3xl font-bold text-center mb-5 text-green-800"> PHYSYS</h1>
          <p className="text-center text-xl mb-8 text-green-900">
             Express Yourself For A Greener Future!
          </p>
          <div className="flex justify-center mb-12">
            <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">
            <Link to="/Login">Log In</Link>
            </button>
            <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">
            <Link to="/Register">Sign In</Link>
            </button>
          </div>
        </div>
      </div>
    
      )

    }
}
export default LandingPage