import jwtAuth from "../../middlewares/auth.middleware.js";
import CommentController from "./comment.controller.js";
import express from 'express';

const commentController = new CommentController();

const router = express.Router();

// domainName.com/api/comments/:id
router.get('/:id',jwtAuth, commentController.getCommentsByPostId);

// domainName.com/api/comments/:id
router.post('/:id',jwtAuth, commentController.createComment);

// domainName.com/api/comments/:id
router.put('/:id',jwtAuth, commentController.updateCommentOnSpecificPost);

// domainName.com/api/comments/:id
router.delete('/:id',jwtAuth, commentController.deleteCommentOnSpecificPost);

export default router;