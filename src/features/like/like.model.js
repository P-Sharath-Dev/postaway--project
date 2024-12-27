import PostModel from "../post/post.model.js";
import ApplicationError from "../../middlewares/error.middleware.js";

export default class LikeModel{

    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    //getting all post based on postid
    static getAllLikesOnPost(postId){

        //accessing posts array
        const posts = PostModel.getAllPosts();

        const postFound = posts.find(post => post.id == postId);

        if (!postFound) {
            throw new ApplicationError(404, "post not found");
        }

        const totalLikes = likes.filter(like => like.postId == postId);

        return totalLikes.length;  

    }

    //toggling like
    static toggleLike(userId, postId){

        //accessing posts array
        const posts = PostModel.getAllPosts();
        
        const postFound = posts.find(post => post.id == postId);

        if(!postFound){
            throw new ApplicationError(404, "post not found");
        }
        
        const likeIndex = likes.findIndex(like => like.userId == userId && like.postId == postId);

        if(likeIndex != -1){
            //check if user already liked the post. if yes remove the like
            const removeLike = likes.splice(likeIndex, 1);

            return { status: "unliked", like: removeLike };

        } else {
            // add like to the post
            const like = new LikeModel(likes.length+1, userId, postId);

            likes.push(like);

            return { status: "liked", like: like };

        }
    }
}


//likes array
const likes = [
    { id: 1, userId: 1, postId: 1 }, 
    { id: 2, userId: 2, postId: 1 }, 
    { id: 3, userId: 1, postId: 2 }, 
    { id: 4, userId: 2, postId: 2 }, 
];