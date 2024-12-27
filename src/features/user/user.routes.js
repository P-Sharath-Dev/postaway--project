import express from 'express';
import UserController from './user.controller.js';

//instance of UserController
const userController = new UserController();

const router = express.Router();

//domainName.com/api/user/signin
router.post('/signin', userController.login);

//domainName.com/api/user/signup
router.post('/signup', userController.registration);

export default router;