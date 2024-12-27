import ApplicationError from "../../middlewares/error.middleware.js";

export default class PostModel{

    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    //adding new post
    static newPost(userId, caption, imageUrl){

        const newPost = new PostModel(posts.length+1, userId, caption, imageUrl);

        posts.push(newPost);

        return newPost;

    }

    //getting all posts
    static getAllPosts(){

        return posts;

    }

    //getting post by id
    static getPostById(postId){
        
        const post = posts.find(post => post.id === postId);

        if(!post){
            throw new ApplicationError(400, "invalid postId")
        }

        return post;

    }

    //getting user's posts
    static getUserPosts(userId){

        return posts.filter(post => post.userId === userId);

    }

    //updating post
    static updatePost(postId, userId, Updatedcaption, updatedImageUrl){

        const post = posts.find(post => post.id == postId && post.userId == userId);

        if (!post) {
            throw new ApplicationError(400, "Post not found or you're not authorized to update this post.");
        }

        if(post.caption !== Updatedcaption){
            post.caption = Updatedcaption;
        }

        if(post.imageUrl !== updatedImageUrl){
            post.imageUrl = updatedImageUrl
        }

        return post;

    }

    //deleting post
    static deletePost(postId, userId){

        const postIndex = posts.findIndex(post => post.id == postId && post.userId == userId);

        if(postIndex === -1){
            throw new ApplicationError(403, "Invalid postId");
        }

        return posts.splice(postIndex,1);

    }
}


//posts array
export const posts = [
    {
        id: 1,
        userId: 1,
        caption: "My first post!",
        imageUrl: "https://example.com/image1.jpg",
    },
    {
        id: 2,
        userId: 2,
        caption: "Enjoying the sunset",
        imageUrl: "https://example.com/image2.jpg",
    }
];