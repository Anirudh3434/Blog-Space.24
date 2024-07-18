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

                    // Fetch preview images
                    const postsWithPreviews = await Promise.all(data.map(async (post) => {
                        try {
                            const preview = await service.getPreview(post.fileID);
                            post.PreviewImage = preview.href; // Assuming the preview object has an href property
                        } catch (error) {
                            console.error('Error fetching preview image:', error);
                        }
                        return post;
                    }));

                    setPosts(postsWithPreviews);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchUserData();
        fetchPosts();
    }, [email]);

    return (
        <div className='cards-container'>
            {posts.map(post => (
                <div className='card' key={post.$id}>
                    
                    <div className='title-area'>
                        <h3>{post.Title}</h3>
                        <div><span>{parse(post.Content)}</span></div>
                        <Link to={`/post/${post.$id}`}><span>Read more</span></Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
