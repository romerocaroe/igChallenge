const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
    createdDate: { type: Date },
    updateDate: { type: Date },
    imagePosted: { type: String },
    description: { type: String },
    amountOfLikes: { type: Number }
});

module.exports.PostsSchema = PostsSchema;