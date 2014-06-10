
/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = koa();

app.name = 'kserver';

// logging

app.use(logger());

// routing

app.use(route.get('/', index));
app.use(route.post('/', post));

// controller

function *index() {
  var res = 'hallo welt';
  this.body = res;
}

function *post() {
  var res = this;
  this.body = res;
}

// listen

app.listen(3000);
console.log('listening on port 3000' + ' ' + 'http://localhost:3000');
