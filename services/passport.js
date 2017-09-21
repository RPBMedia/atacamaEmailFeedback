const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//Handler to the users collection
const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //Save new user record into mongoDB
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log('User already exists. No new record will be created');
          done(null, existingUser);
        } else {
          console.log('New user detected! Creating new record...');
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);