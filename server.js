const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')

let port = 3000;
const app = express();
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type RootQuery {
      events:[String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query:RootQuery
      mutation:RootMutation
    }
  `),
  graphiql: true,
  rootValue:{
    events:(args) =>{
      return ['cooking','Sails','Roman']
    },
    createEvent: (args) =>{
      const eventName = args.name
      return eventName
    }
  }
}));

app.listen(port);
console.log('GraphQL API server running at localhost:' + port);