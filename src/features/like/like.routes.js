import jwtAuth from "../../middlewares/auth.middleware.js";
import LikeController from "./like.controller.js";
import express from 'express';

const likeController = new LikeController();

const router = express.Router();

//domainName.com/api/likes/:postId
router.get('/:id',jwtAuth, likeController.getAllLikesOnPost);

//domainName.com/api/likes/toggle/:postId
router.get('/toggle/:id',jwtAuth, likeController.toggleLike);

export default router;