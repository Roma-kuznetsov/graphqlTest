const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const { events } = require('./merge')



module.exports = {
    // QUERY RESOLVERS
    users: async (args) => {
        try {
            const users = await User.find()
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdEvents: events.bind(this, user._doc.createdEvents)
                }
            })
        } catch (error) {
            throw error
        }

    },

    // MUTATION RESOLVERS
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('Email used')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 8)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })

            const result = await user.save()

            return { ...result._doc, password: null, _id: result.id }

        } catch (error) {
            console.log(error)
            throw error
        }
    },


    login: async ({email,password}) => {
        try {
            const user = await User.findOne({email:email});
            if(!user){
                throw new Error('User does not exist!');
            };
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual){
                throw new Error('Password is incorrect!');
            };
            const token = jwt.sign({userId:user.id,email:user.email},'secretKey',{
                expiresIn:'24h'
            });
            return{
                userId:user.id,
                token:token,
                tokenExpiration:24
            }
        } catch (error) {
            console.log(error)
            throw new error
        };
    }

}

