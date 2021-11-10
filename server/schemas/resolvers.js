const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const {signToken} = require('../utils/auth');


  const resolvers = {
    Query: {
      user: async(_, {username}) => {
        return User.findOne({username})
      }
    },
    Mutation: {
      login: async(_, {username, password}) => {
        const user = await User.findOne({email});

        if(!user) {
          throw new AuthenticationError("Incorrect username or password")
        }

        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
          throw new AuthenticationError("Incorrection username or password");
        }

        const token = signToken(user);

        return {token, user}
      },
      addUser: async(_, {username, password}) => {
        const user = await User.create({username, password});

        if(!user) {
          throw new AuthenticationError("Something went wrong! Try again.")
        }
        const token = signToken(user);
        return {token, user}
      },
      incrementWin: async (_, __, context) => {
        try {
          const user = await User.findOneAndUpdate({_id: context.user._id}, {$inc: {wins : 1}});
          return user;
        } catch (err) {
          throw new AuthenticationError("An unexpected error occured")
        }
      },
      incrementLoss: async (_, __, context) => {
        try {
          const user = await User.findOneAndUpdate({_id: context.user._id}, {$inc: {losses : 1}});
          return user;
        } catch (err) {
          throw new AuthenticationError("An unexpected error occured")
        }
      },
    }
  };

  module.exports = resolvers;