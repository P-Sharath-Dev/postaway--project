import ApplicationError from "../../middlewares/error.middleware.js";
import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController{

    //function for registration
    registration(req, res, next){

        try {

            const {name, email, password} = req.body;

            //checking if getting data from all fields
            if (!name || !email || !password) {
                throw new ApplicationError(400, "All fields are required"); // handling error
            }

            const user = UserModel.addUser(name, email, password);
            return res.status(201).send(user);

        } catch (e) {
            next(e); // passing error to middleware
        }
        
    }

    //function for login
    login(req, res, next){

        try {
            const {email, password} = req.body;

            //checking if getting data from all fields
            if (!email || !password) {
                throw new ApplicationError(400, "Email and password are required");
            }

            const user = UserModel.confirmUserLogin(email, password);
            
            //creating token when user email and password are correct
            const token = jwt.sign(
                {id : user.id, email : user.email},
                'lVgZFjFICKIe3RjuzVNZUu1tc3Q10TW8',
                 {expiresIn : '1h'}
            );
            return res.status(200).send({ token, msg : 'logged in successfully' });
            

        } catch (e) {
            next(e); // passing error to middleware
        }
        
    }
}