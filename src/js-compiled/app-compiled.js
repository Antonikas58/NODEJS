"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

var bodyParser = require('body-parser');

var crypto = require('crypto');

var uuidv4 = require('uuid/v4');

"use strict";

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
})); //app.use(bodyParser.urlencoded({ extended: false }))

var User = function User(name, pass, email) {
  _classCallCheck(this, User);

  this.id = uuidv4();
  this.name = name;
  this.pass = pass;
  this.email = email;
};

var Worker = function Worker(name, pass, email, exp) {
  _classCallCheck(this, Worker);

  this.id = uuidv4();
  this.name = name;
  this.pass = pass;
  this.email = email;
  this.exp = exp;
};

var users = [];
var workers = [];

function arrayToString(arr, ind) {
  var str = '';
  str += 'Name: ';
  str += arr[ind].name + ' ';
  str += 'Password: ';
  str += arr[ind].pass + ' ';
  str += 'Email: ';
  str += arr[ind].email + ' ';
  str += "\n";
  return str;
}

app.get('/Users', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  for (var i = 0; i < users.length; i++) {
    var str = arrayToString(users, i);
    res.write('<p>');
    res.write(str);
    res.write('</p>');
  }

  res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
  res.end();
});
app.post('/Users/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  console.log(req.body);
  users.push(new User(req.body.UserName, crypto.createHash('md5').update(req.body.UserPassword).digest("hex"), req.body.UserEmail));
  res.write('<p>');
  res.write("User " + req.body.UserName + " Submitted successfully");
  res.write('</p>');
  res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
  res.end();
});
app.get('/Workers', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  for (var i = 0; i < workers.length; i++) {
    var str = arrayToString(workers, i);
    res.write('<p>');
    res.write(str);
    res.write('</p>');
  }

  res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
  res.end();
});
app.post('/Workers/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  console.log(req.body);
  workers.push(new Worker(req.body.WorkerName, crypto.createHash('md5').update(req.body.WorkerPassword).digest("hex"), req.body.WorkerEmail, req.body.WorkerExp));
  res.write('<p>');
  res.write("Worker " + req.body.WorkerName + " Submitted successfully");
  res.write('</p>');
  res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
  res.end();
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/goHome', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(8080, function () {
  console.log('application is working on port 8080');
});
//# sourceMappingURL=app-compiled.js.map
