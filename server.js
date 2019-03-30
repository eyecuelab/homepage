require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(express.static(path.join(__dirname)));
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/people', function (req, res) {
  res.sendFile(path.join(__dirname + '/people.html'));
});

app.post('/contact', function (req, res) {
  console.log('Received contact form submission, sending response via email.');
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emails = [
    {
      to: req.body.email,
      from: 'hello@eyecuelab.com',
      subject: 'Thank You For Your Interest In People EyeCue',
      body: 'Thank you for your interest in People EyeCue, we will get back to you shortly.',
      html: '<p>Thank you for your interest in People EyeCue, we will get back to you shortly.</p>'
    },
    {
      to: 'mike.west@eyecuelab.com',
      from: req.body.email,
      subject: 'People EyeCue Inquiry',
      body: `
      Received information inquiry from https://www.eyecuelab.com/people.
      From: ${req.body.email}
      Current HRIS: ${req.body.hris}
      Company Size: ${req.body.size}
      `,
      html: `
      <h2>Received information inquiry from https://www.eyecuelab.com/people.</h2>
      <p>From: <strong>${req.body.email}</strong></p>
      <p>Current HRIS: <strong>${req.body.hris}</strong></p>
      <p>Company Size: <strong>${req.body.size}</strong></p>
      `
    }
  ];
  sgMail.send(emails)
  .then(() => {
    console.log(`Response email sent to ${req.body.email}.`);
    return res.json({ msg: `Response email sent to ${req.body.email}.`});
  })
  .catch(err => {
    console.log('Error sending email.');
    console.error(err.toString());
    return res.json({ error: err.toString() });
  });
});

app.listen(process.env.PORT || 8080);
