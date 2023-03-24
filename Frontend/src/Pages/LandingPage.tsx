import React from 'react';
import {Link} from 'react-router-dom'
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'



const LandingPage = () => {

    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover', 

      };

    return (


        <div className="h-screen" style={backgroundImageStyle}>
      <div className="container mx-auto px-4 pt-16">
      <img src={GlobeImage} alt="" className="mx-auto mb-8 pt-10" style={{ height: "350px", width: "400px" }} />
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Welcome to Nature</h1>
        <p className="text-center text-xl text-green-900 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          ultrices est in turpis ullamcorper, id lacinia dui ultricies.
        </p>                                                      
        <div className="flex justify-center">
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

export default LandingPage