import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../Appwrite/auth';
import { logIn, logOut } from '../Store/StoreSlice';
import '../App.css';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.login({ email, password });
       if(user){
        const userData = authService.getCurrentUser()
        if(userData){
          dispatch(logIn(userData))
          navigate('/')
        }
       }
    
      
      setEmail('');
      setPassword('');
   ;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signUp = () => {
    navigate('/signup');
  };

  return (
    <div className='signUp-container'>
      <div className='Title'>
        <h1>Log In</h1>
        <br />
        <button className='login' onClick={signUp}>
          Sign Up
        </button>
      </div>

      <div className='form'>
        <form className='signup-form' onSubmit={handleLogin}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' className='start'>Log in</button>
        </form>
      </div>
    </div>
  );
}
