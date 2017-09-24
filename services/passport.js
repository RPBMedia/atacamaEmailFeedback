const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//Handler to the users collection
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //Save new user record into mongoDB
      const exisintgUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log('User already exists. No new record will be created');
        return done(null, existingUser);
      }
      console.log('New user detected! Creating new record...');
      const user = await new User({ googleId: profile.id }).save();
      return done(null, user);
    }
  )
);
