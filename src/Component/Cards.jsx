import React, { useEffect, useState } from 'react';
import service from '../Appwrite/configure';
import authService from '../Appwrite/auth';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

function Cards() {
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setEmail(user.email);
                }
            } catch (error) {
                alert(error);
            }
        };

        const fetchPosts = async () => {
            try {
                const fetchedPosts = await service.getAllpost(email);
                if (fetchedPosts) {
                    const data = fetchedPosts.documents;
                    const updatedPosts = [];
                    
                    for (const post of data) {
                        try {
                            const preview = await service.getPreview(post.Image);
                            post.PreviewImage = preview.href;
                        } catch (error) {
                            console.error('Error fetching preview image:', error);
                        }
                        updatedPosts.push(post);
                    }

                    setPosts(updatedPosts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchUserData();
        if (email) {
            fetchPosts();
        }
    }, [email]);

    console.log(posts);

    return (
        <div className='cards-container'>
            {posts.map(post => (
                <div className='card' key={post.$id}>
                    {post.PreviewImage && <img src={post.PreviewImage} alt={post.Title}  />}
                    <div className='title-area'>
                        <h3>{post.Title}</h3>
                       <span>{parse(post.Content)}</span>
                        <Link to={`/post/${post.$id}`}><span>Read more</span></Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;



