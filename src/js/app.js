const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const uuidv4 = require('uuid/v4');
"use strict";
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }))
class User {
    constructor(name, pass, email) {
        this.id = uuidv4();
        this.name = name;
        this.pass = pass;
        this.email = email;
		
    }
}

class Worker {
    constructor(name, pass, email, exp) {
        this.id = uuidv4();
        this.name = name;
        this.pass = pass;
        this.email = email;
		this.exp = exp;
    }
}
const users = [];
const workers = [];
function arrayToString(arr, ind) {
  let str = '';
  
  
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
	res.writeHead(200, {'Content-Type': 'text/html'});
	for(let i = 0; i < users.length; i++){
	
	let str = arrayToString (users, i);
	
	
	res.write('<p>');
  res.write(str);
  res.write('</p>');
	}
	
    res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
	
	res.end();
});
    
	

app.post('/Users/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(req.body);
    users.push(new User(req.body.UserName, crypto.createHash('md5').update(req.body.UserPassword).digest("hex"), req.body.UserEmail));
    res.write('<p>');
    res.write("User " + req.body.UserName + " Submitted successfully");
	res.write('</p>');
	res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
	res.end();
});

app.get('/Workers', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	for(let i = 0; i < workers.length; i++){
	
	let str = arrayToString (workers, i);
	
	res.write('<p>');
  res.write(str);
  res.write('</p>');
	}
	res.write('<form action="/goHome" method = "get"><button>Home</button></form>');
	res.end();
});
    
	

app.post('/Workers/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
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
