const authResolvers = require('./auth')
const evenstResolvers = require('./events')
const bookingResolsers = require('./booking')


const rootResolver = {
	...authResolvers,
	...evenstResolvers,
	...bookingResolsers
};


module.exports = rootResolver