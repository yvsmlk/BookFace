import React, { useState, useEffect } from "react";

//// Le modal prend 2 props, "setCookiesAccepted" et "cookiesAccepted". La fonction setCookieAcc permet de changer la valeur de cookieAcc. initialment false, mais je la set a true
const ModalCookies = ({cookiesAccepted, setCookiesAccepted}:{cookiesAccepted:boolean,setCookiesAccepted:React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  
    const acceptCookies = () => {
      localStorage.setItem("cookiesAccepted", "true");
      setCookiesAccepted(true);
    };
  
    if (!cookiesAccepted) {
      return (
        

        <div className ="flex flex-col bg-gray-300 bg-opacity-0 h-screen ">
        
            <div className="bg-green-50 rounded border-2 text-center py-3 px-6">
                <div className="text-2xl font-medium text-green-800">
                Cookies Settings!
                </div>
            <div>
                <p className="mb-4 text-base text-green-700">
                    We use cookies to offer you a better user experience. By continuing to browse this site, you agree to our privacy policy and the use of cookies.
                </p>
            <button onClick={acceptCookies}
                className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">
                Accept
            </button></div>
            </div>
        </div>
      );
    }
    else{
        return null;
    }
};

export default ModalCookies;

