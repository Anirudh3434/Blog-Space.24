import React, { useState } from "react";
import {Link} from 'react-router-dom'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import {} from '../Store/StoreSlice'
import { useNavigate } from "react-router-dom";
import { logOut } from "../Store/StoreSlice";
import authService from "../Appwrite/auth";


export default function Header() {

 const authStatus = useSelector(state=>state.auth.status)



  const [Login , setLogin] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch()

 

    const handleLogOut=()=>{

      authService.logout().then(()=>{dispatch(logOut())})
      navigate('/')
   


      }

      const handleDash=()=>{
        navigate('/dashboard')
      }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/signup');
  };
  if(authStatus == 'logged_in'){
  
  

      return (
        <div>
          <nav>
           <div className="logo">
           <Link to="/">
            <span>Space.24</span>
           </Link>
           </div>
           <div className="links">
   
          
             
           </div>
           <div className="button">
               <button className="login" onClick={handleDash}>Dashboard</button>
               <button className="start" onClick={handleLogOut}>Log Out</button>
             
           </div>
          </nav>
          </div>
     
       );
      
    }
    else{
      return (
        <div>
          <nav>
           <div className="logo">
           <Link to="/">
            <span>Space.24</span>
           </Link>
           </div>
           <div className="links">
   
          
             
           </div>
           <div className="button">
               <button className="login" onClick={handleLoginClick}>Login</button>
               <button className="start" onClick={handleGetStartedClick}>Get Started</button>
           </div>
          </nav>
          </div>
     
       );
    }
}

