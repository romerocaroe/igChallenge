module.exports = `
    type Post {
        id: ID,
        createdDate: Date,
        imagePosted: String,
        description: String,
        amountOfLikes: Number
    }

    type Query {
        hello: String,
        fetchPosts: [Post]
    }
`