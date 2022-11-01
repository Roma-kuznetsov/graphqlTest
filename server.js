const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const User = require('./models/user')


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

    type User {
      _id:ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events:[Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
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


    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator:'636133f571512d2ea6f8fe5a'
      })
      let createdEvent;
      return event
        .save()
        .then(result => {
          createdEvent = { ...result._doc, _id: result._doc._id.toString() }
          return User.findById('636133f571512d2ea6f8fe5a')
        })
        .then(user =>{
          if(!user){
            throw new Error ('User not found')
          }
          user.createdEvents.push(event)
          return user.save()
        })
        .then(result =>{
          console.log(result)
          return createdEvent
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    },
    createUser: (args) => {
      return User
      .findOne({email:args.userInput.email})
      .then(user =>{
        if(user){
          throw new Error ('Email used')
        }
        return bcrypt.hash(args.userInput.password, 8)
      })
        .then(hashPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashPassword
          })
          return user.save()
        })
        .then(result =>{
          return {...result._doc, password:null, _id:result.id}
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









