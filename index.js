
/**
 * Module dependencies.
 */

var logger = require('koa-logger')
  , route = require('koa-route')
  , parse = require('co-body')
  , koa = require('koa')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , app = koa();

app.name = 'kserver';

// logging

app.use(logger());

// model definitions

var questionSchema = new Schema({
  title: String,
  body: String
});

var Question = mongoose.model('Question', questionSchema);

// connect to database

mongoose.connect('mongodb://localhost/kommunikationsfragen');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



// routing

app.use(route.get('/questions', getQuestions));
app.use(route.post('/questions', addQuestion));
app.use(route.get('/questions/:id', getQuestion));
app.use(route.put('/questions/:id', updateQuestion));
app.use(route.delete('/questions/:id', deleteQuestion));

// controller

function *getQuestions() {
  var questions = yield Question.find().exec();
  console.log(questions);
  var questionList = '';
  questions.forEach(function(question) {
    questionList += question.title + ' ' + question.body + ', \n';
  });
  var res = 'Questions: \n' + questionList;
  this.body = res;
}

function *getQuestion(id) {
  var question = yield Question.findOne({_id: id}).exec();
  console.log(question);
  var res = 'Question ' + id + ': ' + question.title + ' ' + question.body;
  this.body = res;
}

function *addQuestion() {
  var question = yield parse.json(this);
  var newQ = new Question({title: question.title, body: question.body});
  newQ.save();
  var res = 'Add Question' + ' :: ' + question.title + ' ' + question.body;
  console.log(newQ);
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
