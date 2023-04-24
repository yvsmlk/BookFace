import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const LandingCheck = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const authRoute = DEVELOP+"/login/auth";
      let option = {
        method: 'POST',
        credentials: 'include' as RequestCredentials
      }
      const res = await fetch(authRoute, option);
      res.status === 200 ? setAuth(true) : setAuth(false)
    };
    
    fetchAuth();

  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? <Outlet /> : <Navigate to="/LandingPage" />

};

export default LandingCheck