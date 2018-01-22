const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@surveystar.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    //make sure this.body gets added as content to the mail
    this.addContent(this.body); // we got addContent for free from Mail base class
    this.addClickTracking();
    this.addRecipients();
  }

  // taking in the list of recipients which is our sub document collection
  // pass it off to formatAddresses
  // for every recipient inside that array we pull off the email property,
  // and format it with helper

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  // kinda sendgrid template
  addClickTracking() {
    const trackingSettings = new helper.TrackignSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    const response = this.sgApi.API(request); //this actually sends it off to sendgrid
    return response;
  }
}

module.exports = Mailer;
