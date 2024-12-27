import express from 'express';
import jwtAuth from './src/middlewares/auth.middleware.js';
import userRoutes from './src/features/user/user.routes.js';
import postRoutes from './src/features/post/post.routes.js'
import commentRoutes from './src/features/comment/comment.routes.js';
import likeRoutes from './src/features/like/like.routes.js'
import ApplicationError from './src/middlewares/error.middleware.js';
import { requestLoggingMiddleware, errorLoggingMiddleware } from './src/middlewares/logger.middleware.js';


const app = express();
const port = 3000;

app.use(express.json());

//parsing the data
app.use(express.urlencoded({extended : true}));

// Serve uploaded files
app.use('/uploads', express.static('src/public/uploads'));


//user routes
app.use('/api/user', userRoutes);

// Logger middleware
app.use(requestLoggingMiddleware);

//posts routes
app.use('/api/posts', postRoutes);

//comments routes
app.use('/api/comments', commentRoutes);

//like routes
app.use('/api/likes', likeRoutes);

app.get('/',(req, res)=>{
    res.send('postaway project');
})

//handling 404 errors
app.use((req, res)=> {
    res.status(404).send("Page Not Found, visit : localhost:3000/");
});

// Error logging middleware
app.use(errorLoggingMiddleware);

//error handling middleware
app.use((err, req, res, next) => {
    
    if (err instanceof ApplicationError) {
        const {code, message} = err;
        return res.status(code).send(message);
    }
    
    res.status(500).send("something went wrong!");
});

app.listen(port, ()=>{
    console.log(`our app is listening on port ${port}`);
})