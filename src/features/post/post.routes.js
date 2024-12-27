import express from 'express';
import PostController from './post.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';
import fileUpload from '../../middlewares/fileUpload.middleware.js';

//instance of PostController
const postController = new PostController();

const router = express.Router();

//domainName.com/api/posts/all
router.get('/all', postController.getAllPosts);

//domainName.com/api/posts/:id
router.get('/:id', postController.getPostbyId);

//domainName.com/api/posts/
router.get('/', jwtAuth,postController.getUserPosts);

//domainName.com/api/posts/
router.post('/', jwtAuth, fileUpload.single('imageUrl'), postController.createPost);

//domainName.com/api/posts/:id
router.put('/:id', jwtAuth, fileUpload.single('imageUrl'), postController.updatePost);

//domainName.com/api/posts/:id
router.delete('/:id', jwtAuth, postController.deletePost)

export default router;