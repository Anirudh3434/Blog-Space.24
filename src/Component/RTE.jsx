import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import service from '../Appwrite/configure'; 
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import authService from '../Appwrite/auth';

function RTE() {
    const [article, setArticle] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [featureImage, setFeatureImage] = useState(null); 

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email , setEmail] =  useState('')

    const fileTypes = ["JPG", "PNG", "GIF"];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await authService.getCurrentUser();
                if(user){

                   setEmail(user.email)
                }
            } catch (error) {
                alert(error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (file) => {
        setFeatureImage(file);
        console.log(file);
    };



    useEffect(() => {
        const generateSlug = (title) => {
            return title.toLowerCase().replace(/\s+/g, '-');
        };
        setSlug(generateSlug(title));
    }, [title]);




    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let fileID = null;
            if (featureImage) {
                const uploadedFile = await service.uploadFile(featureImage);
                fileID = uploadedFile.$id;
            }

            const postData = {
                slug: slug,
                title: title,
                content: article,
                featureImage: fileID,
                userID: nanoid(),
                email : email
            };

         
            const response = await service.createPost(postData);

           
            alert('Post created successfully');
            navigate('/dashboard');
            
        } catch (error) {
            console.error(error);
            alert(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='editor-container'>
          
            <div className='form-section'>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="slug">Slug</label>
                <input
                    type="text"
                    id="slug"
                    value={slug}
                    readOnly
                />

                <label htmlFor="editor">Editor</label>
                <div className='container'>
                    <Editor
                        apiKey='e3cyeyt9xvlg18sch1k6869bxy7bvxrq80v1o2atkr85n3vz'
                        init={{
                            branding: false,
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue={article}
                        onChange={(e) => setArticle(e.target.getContent())}
                    />
                    <button className='start' onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
                </div>
            </div>

            <div className='upload-section'>
                <label htmlFor="image">Add Preview Image</label>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} label='Upload preview image'/>
            </div>
        </div>
    );
}

export default RTE;
