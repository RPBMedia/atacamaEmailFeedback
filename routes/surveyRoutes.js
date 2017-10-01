const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const booleanSurveyTemplate = require('../services/emailTemplates/booleanSurveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thank you for your feedback!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('----------NEW WEBHOOK PING----------');
    console.log(req.body);
    const eventPath = new Path('/api/surveys/:surveyId/:choice');

    const uniqueEvents = _.chain(req.body)
      .map(({ email, url }) => {
        const match = eventPath.test(new URL(url).pathname);

        if (match) {
          //match can be null, so destructuring is a
          //bad idea because it might return null.something
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    console.log('----------UNIQUE EVENTS');
    console.log(uniqueEvents);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

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
