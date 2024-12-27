import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    //get token from request
    console.log("req.headers: ", req.headers);
    const token = req.headers.authorization;
    console.log(token);

    if(!token){

        return res.status(400).send('unathorized');

    }

    //verify token
    try {

        const validToken = jwt.verify(token, 'lVgZFjFICKIe3RjuzVNZUu1tc3Q10TW8');

        console.log("isVlidtoken", validToken);
        req.userId = validToken.id;
        next();

    } catch (e) {
        return res.status(401).send("invalid token");
    }

    
}

export default jwtAuth;