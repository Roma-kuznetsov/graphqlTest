const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const Event = require('./models/event')


const app = express();
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`

    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events:[Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query:RootQuery
      mutation:RootMutation
    }
  `),
  graphiql: true,
  
  rootValue: {


    events: (args) => {
      return Event.find().then(events => {
        // console.log({...events})
        // return events
        return events.map(event => {
          return { ...event._doc, _id: event.id }
        })
      }).catch(err => {
        console.log(err)
        throw err
      })
    },

    // return {...event._doc, _id:event.id}

    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      })
      return event
        .save()
        .then(result => {
          console.log(result)
          return { ...result._doc, _id: result._doc._id.toString() }
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    }


  }
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









