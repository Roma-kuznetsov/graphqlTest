const Event = require('../../models/event')
const User = require('../../models/user') 
const {transformEvent} = require('./merge')

module.exports = {
    // QUERY RESOLVERS
    events: async (args) => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event)
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    // MUTATION RESOLVERS
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '636133f571512d2ea6f8fe5a'
        })
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = transformEvent(result)
            const creator = await User.findById('636133f571512d2ea6f8fe5a')

            if (!creator) {
                throw new Error('User not found')
            }

            creator.createdEvents.push(event)
            await creator.save()
            return createdEvent

        } catch (error) {
            console.log(error)
            throw error
        }
    },

}