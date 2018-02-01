const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _.chain(req.body) //iterate over req.body
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //returns only event objects.  no undefineds.
      .uniqBy('email', 'surveyId') // remove duplicates!
      .value();

    console.log(events);
    res.send({});
  });

  // this post request route handler will both create a new survey and send out
  // a big email
  // check if user is logged in and authenticated
  // check that the user has enough credits
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //create a new instance of the Survey model
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err); // 422 means unprocessable entity (user error)
    }
  });
};
