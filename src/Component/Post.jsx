import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../Appwrite/configure';
import parse from 'html-react-parser';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await service.getPost(id);
                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    console.log(post)

return (
        <div className='post-Container'>
            <h1>{post.Title}</h1>
            <div>{parse(post.Content)}</div>
        </div>
    );
}

export default Post;
