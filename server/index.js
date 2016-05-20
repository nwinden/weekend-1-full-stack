var express = require('express');
var app = express ();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var employee = require('./routes/employee');

app.use(bodyParser.urlencoded({extended:true}));

app.set('port', (process.env.PORT || 3000));

app.use('/employee', employee);

app.get('/*', function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log('server is ready on port: ' + app.get('port'));
});
