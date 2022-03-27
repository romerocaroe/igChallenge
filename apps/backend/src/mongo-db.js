const mongoose = require('mongoose');
const { environment } = require('./config');
const { PostsSchema } = require('./modules/posts/models/postModel');
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

console.log("DB connected: ",environment[env].dbString)
mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Post = mongoose.model("Post", PostsSchema);

module.exports = { Post };