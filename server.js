require('dotenv').config();

var fs = require('fs');
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

app.get('/people/schedule', function (req, res) {
  res.sendFile(path.join(__dirname + '/sched.html'));
});

app.post('/contact', function (req, res) {
  console.log('Received contact form submission, sending response via email.');
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const HRIS = [
    "disabled",
    "Oracle",
    "Infor",
    "Workday",
    "Kronos",
    "Dayforce",
    "SAP",
    "Other"
  ];

  const COMPANY_SIZE = [
    "disabled",
    "1-100",
    "101-250",
    "251-500",
    "501-2500",
    "2501-5000",
    "5001+"
  ];

  const emails = [
    {
      to: req.body.email,
      from: 'hello@eyecuelab.com',
      subject: 'Thank You For Your Interest In People EyeCue',
      body: 'Thank you for your interest in People EyeCue. To schedule a time for your 30 minute consultation, please visit https://www.eyecuelab.com/people/schedule',
      html: `<p>Thank you for your interest in People EyeCue. <a href="https://www.eyecuelab.com/people/schedule?a1=${req.body.hris}&a2=${req.body.size}">Click here</a> to schedule a time for your 30 minute consultation.</p>`
    },
    {
      to: 'mike.west@eyecuelab.com',
      from: req.body.email,
      subject: 'People EyeCue Inquiry',
      body: `
      Received information inquiry from https://www.eyecuelab.com/people.
      From: ${req.body.email}
      Current HRIS: ${HRIS[req.body.hris]}
      Company Size: ${COMPANY_SIZE[req.body.size]}
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
    console.log(`Response sent to ${req.body.email}.`);
    res.status(200).send({
      responseText: `<p>Your request has been sent. Please check your email to schedule a time for your consultation.</p>`
    });
  })
  .catch(err => {
    console.log('Error sending email.');
    console.error(err.toString());
    res.status(err.code ? err.code : 400).send(err);
  });
});

app.listen(8080);
fs.openSync('/tmp/app-initialized', 'w');
