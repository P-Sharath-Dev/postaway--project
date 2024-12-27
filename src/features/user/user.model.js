import ApplicationError from "../../middlewares/error.middleware.js";

export default class UserModel{

    constructor(_id, _name, _email, _password){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }

    //adding user
    static addUser(name,email, password){

        //checking if user already registered using email
        const existingUser = users.find(user => user.email == email);

        if (existingUser) {
            throw new ApplicationError(400, "email already exists"); //error handling
        }

        //adding new user
        const newUser = new UserModel(users.length+1, name, email, password);
        users.push(newUser);

        return newUser;

    }

    //getting all users
    static getAllUsers(){

        return users;

    }

    //comfirming user login
    static confirmUserLogin(email, password){

        const user = users.find(user => user.email == email && user.password == password); 

        if(!user){
            throw new ApplicationError(401, "invalid email or password");
        }

        return user;

    }

}

//users array
export const users = [
    {
        id : 1,
        name : "john",
        email : "john@gmail.com",
        password : 12345,
    },
    {
        id : 2,
        name : "alex",
        email : "alex@gmail.com",
        password : 12345
    }
];