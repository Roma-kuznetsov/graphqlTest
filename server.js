const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config.json')
const isAuth = require('./middleware/is-auth');
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')


const app = express();

app.use(bodyParser.json())

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  graphiql: true,
  rootValue: graphQlResolvers
}));

const DB_URL = config.DB_URL //scum testNotConnect
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL)
  .then(() => {
    app.listen(PORT)
    console.log('GraphQL API server running at localhost:' + PORT)
  })
  .catch(err => {
    console.log(err)
  })









