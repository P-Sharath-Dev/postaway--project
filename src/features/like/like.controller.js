import express from 'express';
import jwtAuth from '../../middlewares/auth.middleware.js';
import LikeModel from './like.model.js';
import ApplicationError from '../../middlewares/error.middleware.js';

export default class LikeController{

    //getting all likes
    getAllLikesOnPost(req, res, next){

        try {
            const postId = req.params.id;
            
            const totalLikes = LikeModel.getAllLikesOnPost(postId);
            
            return res.status(200).send(`postId ${JSON.stringify(postId)} has ${JSON.stringify(totalLikes)} likes`);

        } catch (e) {
            next(e); // passing error to handle
        }

    }

    //toggling like
    toggleLike(req, res, next){

        try {
            const userId = req.userId;
            const postId = req.params.id;

            const result = LikeModel.toggleLike(userId, postId);

            //check if post is being liked
            if (result.status === "liked") {
                return res.status(200).send(`you liked the post with id ${postId}`);
            } 
            //check if post is being liked
            else if (result.status === "unliked") {
                return res.status(200).send(`you unLiked the post with id ${postId}`);
            } 
            
        } catch (e) {
            next(e);
        }
    }
}