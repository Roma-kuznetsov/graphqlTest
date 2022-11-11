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

app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200)
  }
  next();
});

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  graphiql: true,
  rootValue: graphQlResolvers
}));

const DB_URL = config.DB_URL //scum testNotConnect
const PORT = process.env.PORT || 8000;

mongoose.connect(DB_URL)
  .then(() => {
    app.listen(PORT)
    console.log('GraphQL API server running at localhost:' + PORT)
  })
  .catch(err => {
    console.log(err)
  })









