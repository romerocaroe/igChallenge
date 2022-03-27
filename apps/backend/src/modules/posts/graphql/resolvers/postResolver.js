const { fetchPostsService, createPostService } = require('../../services/postService')

module.exports = {
    Query: {
        fetchPosts: (_, {}, {}) => {
            return fetchPostsService();
        },
        hello: () => "Hello World!"
    },
    Mutation: {
        createPost: (_, {}, {}) => {
            return createPostService();
        },
    }
}