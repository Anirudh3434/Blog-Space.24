import React from 'react';
import { useNavigate } from "react-router-dom";
import config from '../config/config'

function Home() {



   
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup');
  }
  return (
    <div className='home-container'>
       <div className='home-section'>
         
         <h1>Create a Blog</h1>

         <p className='line'>Share your story with the world. Create a beautiful,
             personalized blog that fits your brand.
             Grow your audience with built-in marketing tools,
              or transform your passion into revenue by gating access with a paywall.</p>

              <button className='start1' onClick={handleGetStartedClick}>Get Started</button>

       </div>
    </div>
  );
}

export default Home;
