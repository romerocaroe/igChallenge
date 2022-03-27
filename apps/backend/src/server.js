let express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { fetchPostsService, fetchPostService, createPostService, updatePostService, deletePostService } = require('../src/modules/posts/services/postService')
const {PORT} = require('./config')

let typeDefs = gql`
    type Post {
        id: ID!,
        createdDate: String,
        updateDate: String,
        imagePosted: String,
        description: String,
        amountOfLikes: Int
    }

    type Query {
        posts: [Post],
        post(id: ID!): Post
    }

    input PostInput {
        createdDate: String,
        updateDate: String,
        imagePosted: String,
        description: String,
        amountOfLikes: Int
    }

    type PostDeleted {
        id: ID!
        deleteSuccess: Boolean!
    }    

    type Mutation {
        createPost(input:PostInput): Post,
        updatePost(id: ID!, input:PostInput): Post
        deletePost(id: ID!): PostDeleted!
    }
`;

let resolvers = {
    Query: {
        posts: () => fetchPostsService(),
        post: (_,{id}) => fetchPostService(id)
    },
    Mutation: {
        createPost: (_,{input}) => {
            return createPostService(input)
        },
        updatePost: (_,{id, input}) => {
            return updatePostService(id, input)
        },
        deletePost: (_,{id}) => {
            return deletePostService(id)
        },
    }
};

const server = new ApolloServer({ typeDefs, resolvers})

const app = express()
server.applyMiddleware({ app })

app.listen({port: PORT}, () => {
    console.log('Running a GraphQL API server at http://localhost:'+ PORT+'/graphql');
});