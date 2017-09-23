const passport = require('passport');

module.exports = (app) => {

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    //logout func is attached to the req object by passport
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    //user is attached to the req object by passport
    res.send(req.user);
  });

};
