import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../Appwrite/configure';
import parse from 'html-react-parser';

function Post() {
    const { UserID } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await service.getPost(UserID);
              console.log(fetchPost)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [UserID]);

    console.log(post);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className='post-Container'>
            <h1>{post.Title}</h1>
            <div>{parse(post.Content)}</div>
        </div>
    );
}

export default Post;
