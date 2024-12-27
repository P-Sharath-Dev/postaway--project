import ApplicationError from "../../middlewares/error.middleware.js";
import PostModel from "../post/post.model.js";

export default class CommentModel{

    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    //creatin comments
    static createComment(userId, postId, content){

        //check if post id is available
        const posts = PostModel.getAllPosts();
        
        const findPost = posts.find(post => post.id == postId);

        if(!findPost){
            throw new ApplicationError(404, "post not found. ");
        }

        const addComment = new CommentModel(comments.length+1, userId, postId, content);

        comments.push(addComment);
        return addComment;

    }

    //getting comments by post id
    static getCommentsByPostId(postId){
        
        //check if post id is available
        const posts = PostModel.getAllPosts();
        
        const findPost = posts.find(post => post.id == postId);

        if(!findPost){
            throw new ApplicationError(404, "post not found. ");
        }

        const getComments = comments.filter(comment => comment.postId == postId);

        if (getComments.length === 0) {
            throw new ApplicationError(404, "no comments found");
        }

        return getComments;
    }

    //updating comment
    static updateComment(userId, postId, updatedContent){

        //check if post id is available
        const posts = PostModel.getAllPosts();

        const findPost = posts.find(post => post.id == postId);

        if(!findPost){
            throw new ApplicationError(404, "post not found. ");
        }

        const comment = comments.find(comment => comment.userId == userId && comment.postId == postId);

        if (!comment) {
            throw new ApplicationError(404, "no comments found to update");
        }

        comment.content = updatedContent;   
        return comment;

    }

    //deleting comment
    static deleteComment(userId, postId){

        //check if post id is available
        const posts = PostModel.getAllPosts();
        
        const findPost = posts.find(post => post.id == postId);

        if(!findPost){
            throw new ApplicationError(404, "post not found. ");
        }
        
        const findDeleteIndex = comments.findIndex(comment => comment.userId == userId && comment.postId == postId);
        
        if(findDeleteIndex === -1){
            throw new ApplicationError(404, "Comment not found for given userId and postId to delete")
        }

        const deletedComment = comments[findDeleteIndex];
        comments.splice(findDeleteIndex, 1);

        return deletedComment;

    }
}


//comments array
const comments = [

    {id: 1, userId: 1, postId: 1, content: 'Great post!'},
    {id: 2, userId: 2, postId: 1, content: 'Thanks for sharing!'},
    {id: 3, userId: 1, postId: 2, content: 'Informative article.'},
    {id: 4, userId: 3, postId: 2, content: 'Nice work!'},
    
];