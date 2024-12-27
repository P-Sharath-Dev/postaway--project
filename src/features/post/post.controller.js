import PostModel from "./post.model.js";
import ApplicationError from "../../middlewares/error.middleware.js";

export default class PostController{

    //creating post
    createPost(req, res, next){
        
        try {
            const userId = req.userId;
            const { caption } = req.body;
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; //file upload

            const newPost = PostModel.newPost(userId, caption, imageUrl);

            return res.status(201).send(newPost);

        } catch (e) {
            next(e); //passsing error to handle
        }

    }

    //getting all posts
    getAllPosts(req, res, next){
        
        try {
            const allPosts = PostModel.getAllPosts();
            return res.status(200).send(allPosts);
        } catch (e) {
            next(e);
        }

    }

    //get posts by id
    getPostbyId(req, res, next){

        try {
            const postId = parseInt(req.params.id);

            const post = PostModel.getPostById(postId);

            return res.status(200).send(post);

        } catch (e) {
            next(e);
        }

    }

    //getting user posts
    getUserPosts(req, res, next){

        try {
            const userId = req.userId;

            const post = PostModel.getUserPosts(userId);

            return res.status(200).send(post);

        } catch (e) {
           next(e); 
        }

    }

    //updating post
    updatePost(req, res, next){

        try {
            const userId = req.userId;
            const postId = req.params.id;
            const {caption} = req.body;
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

            const updatedPost = PostModel.updatePost(postId, userId, caption, imageUrl);

            return res.status(200).send(updatedPost);

        } catch (e) {
            next(e);
        }

    }

    //deleting post
    deletePost(req, res, next){

        try {
            const userId = req.userId;
            const postId = req.params.id;

            const deletedPost = PostModel.deletePost(postId, userId);

            return res.status(200).send(`the post that you deleted is : \n ${JSON.stringify(deletedPost)} `);
            
        } catch (e) {
            next(e);
        }

    }
}