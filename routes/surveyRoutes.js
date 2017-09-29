const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const booleanSurveyTemplate = require('../services/emailTemplates/booleanSurveyTemplate');


const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for your feedback!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })

    const mailer = new Mailer(survey, booleanSurveyTemplate(survey));

    try {

      await mailer.send();

      //Save the survey in mongo with mongoose
      await survey.save();
      //Update the number of credits in the user model and save the user in mongo
      req.user.credits -= 1;
      const user = await req.user.save();

      //return the updated user
      res.send(user);

    } catch (error) {
      res.status(422).send(error);
    }


  });

};
