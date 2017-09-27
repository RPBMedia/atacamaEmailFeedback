const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
//Order of the require statements matters. User schema must be created
//Before we use passport
require('./models/User');
require('./models/Survey');
require('./services/passport');
const keys = require('./config/keys');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    //Cookies will expire after 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

//Prod configuration only
if(process.env.NODE_ENV === 'production') {
  // Express will serve production assets like main.js file
  app.use(express.static('client/build'));

  //Serve index-html if the route is not recognized
  const path = require('path');
  app.get('*', (req ,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`<----Magic is happening at port ${PORT}--->`);
});
