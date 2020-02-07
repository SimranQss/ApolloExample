var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const courseType = new graphql.GraphQLObjectType({
    name : 'Course',
    fields :{
        id: {type : graphql.GraphQLInt},
        title: {type: graphql.GraphQLString},
        author: {type: graphql.GraphQLString} ,
        description: {type: graphql.GraphQLString},
        topic: {type: graphql.GraphQLString},
        url:{type: graphql.GraphQLString}
    }
})

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        course: {
            type: courseType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: (_, {id}) => {
                return coursesData[id];
            }
        },
        // courses: {
        //     type: [courseType],
        //     args :{
        //         topic : {
        //              type : graphql.GraphQLString
        //         }
        //     },
        //     resolve: (_,{topic}) => {
        //         if (topic) {
        //             return coursesData.filter(course => course.topic === topic);
        //         }
        //        else
        //         return coursesData;
        //     }
        // }
    }
});

const schema = new graphql.GraphQLSchema({
    query: queryType
});

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);