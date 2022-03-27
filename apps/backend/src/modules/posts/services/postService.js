/* let posts = require('../../../posts.json')*/
const { Post } = require('../../../mongo-db')

module.exports.fetchPostsService = () => {
    return new Promise((resolve, reject) => {
        Post
        .find({})
        .exec((err, res) => (err ? reject(err) : resolve(res)));
    });
}

module.exports.fetchPostService = (id) => {
    return new Promise((resolve, reject) => {
        Post
        .find({ _id: id })
        .exec((err, res) => (err ? reject(err) : resolve(res)));
    });
}

module.exports.createPostService = ({createdDate = Date.now(),updateDate = Date.now(),imagePosted,description,amountOfLikes}) => {
    const newPost = new Post({
        createdDate,
        updateDate,
        imagePosted,
        description,
        amountOfLikes
    })
    newPost.id = newPost._id
    return new Promise((resolve, reject) => {
        newPost.save((err) => {
            if(err){ reject(err) }
            resolve(newPost)
        })
    })
}

module.exports.updatePostService = (id, {createdDate,updateDate = Date.now(),imagePosted,description,amountOfLikes}) => {
    return new Promise((resolve, reject) => {
        Post.findOneAndUpdate(
            { _id: id},
            {
                createdDate,
                updateDate,
                imagePosted,
                description,
                amountOfLikes
            },
            (err, doc) => {
                if(err) reject(err)
                resolve(doc)
            }
        )
    })
}

module.exports.deletePostService = (id) => {
    return new Promise((resolve, reject) => {
        Post.deleteOne({ _id: id })
        .exec((err) => (err ? reject(err) : resolve({ id, deleteSuccess: true })));
    });
}