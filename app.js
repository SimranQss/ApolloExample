const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql')

const app = express();

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!"
      }
    })
  })

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log("listening at port 4000")
