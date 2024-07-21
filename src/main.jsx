import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import App from './App.jsx';
import Home from './Component/Home';
import SignUp from './Component/SignUp';
import LogIn from './Component/LogIn';
import './styles.css'; 
import Store from './Store/Store.js';  
import DashBoard from './Component/DashBoard.jsx';
import RTE from './Component/RTE.jsx';
import Post from './Component/Post.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={800}>
        <Routes location={location}>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="editor" element={<RTE />} />
            <Route path="/post/:UserID" component={Post} />
         

          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}> 
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </Provider>
);
