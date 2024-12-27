import CommentModel from "./comment.model.js";
import jwtAuth from "../../middlewares/auth.middleware.js";
import ApplicationError from "../../middlewares/error.middleware.js";

export default class CommentController{

    //creating comment
    createComment(req, res, next){

        try {
            const userId = req.userId;
            const postId = req.params.id;
            const {content} = req.body;

            const comment = CommentModel.createComment(userId, postId, content);
            return res.status(201).send(`comment added : ${JSON.stringify(comment)}`);

        } catch (e) {
            next(e);
        }

    }

    //getting comments by post id
    getCommentsByPostId(req, res, next){

        try {
            const postId = req.params.id;

            const comments = CommentModel.getCommentsByPostId(postId);

            return res.status(200).send(comments);

        } catch (e) {
            next(e); //passing error
        }
    }

    //updatin comments on specific posts
    updateCommentOnSpecificPost(req, res, next){

        try {

            const userId = req.userId;
            const postId = req.params.id;
            const {content} = req.body;

            const updatedComment = CommentModel.updateComment(userId, postId, content);

            return res.status(200).send(`comment updated ${JSON.stringify(updatedComment)}`);

        } catch (e) {
            next(e);
        }
    }

    //deleting comments on specific posts
    deleteCommentOnSpecificPost(req, res, next){

        try {

            const userId = req.userId;
            const postId = req.params.id;

            const deletedComment = CommentModel.deleteComment(userId, postId);

            return res.status(200).send(`comment deleted ${JSON.stringify(deletedComment)}`);
            
        } catch (e) {
            next(e);
        }
    }
}