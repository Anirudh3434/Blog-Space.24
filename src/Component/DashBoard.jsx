import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from './Cards'; 
import AddCard from './AddCard';
import authService from '../Appwrite/auth';

export default function DashBoard() {
    const [userName, setuserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await authService.getCurrentUser();
                if(user){
                    setuserName(user.name)
                }
            } catch (error) {
                alert(error);
            }
        };

        fetchUserData();
    }, []);

    return (
       <div className='header'>
       <h1 className='head'>Welcome<span>{userName}</span></h1>
        <div className="dashboard-container">
            <div className="user-info">
              
            </div>
            <div className="card-area">
                <Cards />
                <Link to='/editor'>
                    <AddCard />
                </Link>
            </div>
        </div></div>
    );
}
