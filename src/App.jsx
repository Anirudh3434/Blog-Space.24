import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Component/Header';
import Footer from './Component/Footer';
import authService from './Appwrite/auth';
import { logIn, logOut } from './Store/StoreSlice';
import Loading from './Component/Loading';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);


 
 
   

  useEffect(() => {
   
    const checkUser = async () => {
      try {
        const user = await authService.getCurrentUser();
  
        if (user) {
          dispatch(logIn(user));
        
        }
      } catch (error) {
        alert('No user logged in', error);
      }
    };
    checkUser();
  }, [dispatch, navigate]);


 

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='main'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
