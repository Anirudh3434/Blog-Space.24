import config from '../config/config';

import {Client, Databases,Storage , ID, Query} from 'appwrite'

export class Service {
    client = new Client();
    database;
    storage

    constructor(){
        this.client.setEndpoint(config.url).setProject(config.projectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
        

        
    }

       //Post Operation
       async createPost({ title, slug, content, featureImage, userID , email }) {
        try {
            const documentData = {
                Title: title,           
                Content: content,
                Image: featureImage,
                UserID: userID,
                email : email
            };
            console.log('Creating document with data:', documentData);
            return await this.database.createDocument(config.databaseId, config.collectionId, slug, documentData);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }
    
    async updatePost(slug , {title , content , featureImage , userID , status}){

        try {

           return await this.database.updateDocument(config.databaseId , config.collectionId , slug, {
            title,
            slug ,
             content , 
             featureImage , 
             userID , 
             status
            
    })
            
        } catch (error) {
            throw error
        }

    }

    async deletePost(slug ){

        try {

            return await this.database.deleteDocument(config.databaseId , config.collectionId , slug)
             
         } catch (error) {
             throw error
         }
 
    }
    async getPost(slug ){

        try {

            return await this.database.getDocument(config.databaseId , config.collectionId , slug)
             
         } catch (error) {
             throw error
         }
 
    }

    async getAllpost(email){
        try {
              const reponse = await this.database.listDocuments(config.databaseId , config.collectionId ,[Query.equal('email',email)])
              return reponse
        } catch (error) {
            throw error
        }
    }

  

         // Store Operation

    async uploadFile(file){
        try {
            
            return await this.storage.createFile(config.bucketId, ID.unique(), file)

        } catch (error) {
            throw error
        }
    }

    async DeleteFile(fileID){
        try {
            
            return await this.storage.deleteFile(config.bucketId , ID.unique(), fileID)

        } catch (error) {
            throw error
        }
    }
    async getPreview(fileID){
        try {
              return await this.storage.getFilePreview(config.bucketId , fileID)
        } catch (error) {
            throw error
        }
    }
}


const service = new Service()

export default service