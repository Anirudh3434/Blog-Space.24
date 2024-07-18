import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import authService from '../Appwrite/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const data = {
    email: email,
    password: password,
    name: name,
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await authService.createAccount(data)
      

    } catch (error) {
      alert(error)
      
    }
  };

  return (
    <div className='signUp-container'>
         
      <div className='Title'>
        <h1>Sign Up</h1>
        <br />
        <button className='login' onClick={handleLogin}>
          Log In
        </button>
      </div>

      <div className='form'>
        <form className="signup-form" onSubmit={handleSignUp}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" className='start'>Sign Up</button>
      
        </form>
      </div>
    </div>
  );
}
