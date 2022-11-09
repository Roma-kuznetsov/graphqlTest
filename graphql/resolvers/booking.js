const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./merge')


module.exports = {
    // QUERY RESOLVERS
    booking: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (error) {
            console.log('error в книгах(bookings)')
            throw error
        }
    },

    // MUTATION RESOLVERS

    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: '636133f571512d2ea6f8fe5a',
                event: fetchedEvent
            });
            const result = await booking.save();
            return transformBooking(result)
        } catch (error) {
            console.log(error)
            throw error
        };
    },

    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = transformEvent(booking.event)
            await Booking.deleteOne({ _id: args.bookingId })
            return event
        } catch (error) {
            console.log("check cancelBooking")
            throw error
        }
    },
}