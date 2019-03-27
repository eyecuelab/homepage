var express = require('express');
var app = express();
var path = require('path');

var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(express.static(path.join(__dirname)));
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/people', function (req, res) {
  res.sendFile(path.join(__dirname + '/people.html'));
})

app.listen(process.env.PORT || 8080);
