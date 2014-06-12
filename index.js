
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

app.use(route.get('/questions', getQuestions));
app.use(route.post('/questions', addQuestion));
app.use(route.get('/questions/:id', getQuestion));
app.use(route.put('/questions/:id', updateQuestion));
app.use(route.delete('/questions/:id', deleteQuestion));

// controller

function *getQuestions() {
  var res = 'Many Questions';
  this.body = res;
}

function *getQuestion(id) {
  var res = 'Question ' + id;
  this.body = res;
}

function *addQuestion() {
  var res = 'Add Question';
  this.body = res;
}

function *updateQuestion(id) {
  var res = 'Update Question ' + id;
  this.body = res;
}

function *deleteQuestion(id) {
  var res = 'Delete Question ' + id;
  this.body = res;
}

// listen

app.listen(3000);
console.log('listening on port 3000' + ' ' + 'http://localhost:3000');
