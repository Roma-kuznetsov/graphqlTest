const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')




const app = express();
app.use(bodyParser.json())



app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  graphiql: true,
  rootValue: graphQlResolvers
}));

const DB_URL = `mongodb+srv://Romikr89:Romikrty2000@cluster0.bwkdp89.mongodb.net/?retryWrites=true&w=majority` //scum testNotConnect
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL)
  .then(() => {
    app.listen(PORT)
    console.log('GraphQL API server running at localhost:' + PORT)
  })
  .catch(err => {
    console.log(err)
  })









