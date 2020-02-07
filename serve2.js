//without using GraphQL schema language:

var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');


var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};

var address = {
    city: "Noida"
}

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: graphql.GraphQLString
        },
        name: {
            type: graphql.GraphQLString
        },
        address: {
            type: addressType,
            resolve: () => {
                return address
            }
        }
    })
});

var addressType = new graphql.GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        city: {
            type: graphql.GraphQLString
        }
    })
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: (_, {id}) => {
                return fakeDatabase[id];
            }
        },
        address: {
            type: addressType,
            // `args` describes the arguments that the `user` query accepts
            resolve: () => {
                return address;
            }
        }
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