require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '..', 'public');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Question = require('./models/question');

 
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Configure express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const { MongoClient } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION_STRING ; // replace with url string for local developlment
const client = new MongoClient(uri);
// mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
// .then((result) => console.log('connected to db'))
// .catch((err)=> console.log(err));

app.get('/', (req, res) => {
  res.redirect('/questions');
});


app.get('/questions', (req, res) => {
  Question.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { questions: result });
    })
    .catch(err => {
      console.log(err);
    });
});

async function run() {
    try {
      await client.connect();
      const database = client.db('sysc4806');
      const surveys = database.collection('surveys');
      // Query for a survey with test field that has content "test"
      const query = { test: 'test' };
      const survey = await surveys.findOne(query);
      console.log(survey);
      return survey.test
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

//create enpoints for API we will use to request information
//From backend
//req = request, res = response
app.get("/testDatabase/", async (req, res) => {
    let response = await run().catch(console.dir)      
    res.json({response: response});
});

//return the react application
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
 
app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});

// POST survey responses to database
app.post("/addResponses", async (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("test_surveys");
    dbo.collection("survey_responses").insertOne(req.body,
      function (err, result) {
        if (err)
          throw err;
        res.json(result);
        db.close();
      });
  });
});

// mongoose & mongo tests
app.get('/add-question', (req, res) => {
  const question = new Question({
    id: 22,
    question: 'smaple q',
    answers: 'smaple a'
  })

  question.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

async function getSurveys(){
  try{
    await client.connect();
      const database = await client.db('test_surveys');
      const surveys = await database.collection('surveys')
      const survey = await surveys.find({}).toArray();
      return survey
  }finally{
    //ensure that client will close when you finish/error
    await client.close();
  }
}
//create enpoints for API we will use to request information
//From backend
//req = request, res = response
app.get("/surveys/", async (req, res) => {
  let response = await getSurveys().catch(console.dir)      
  res.json({response: response});
});


app.get('/all-questions', (req, res) => {
  Question.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// POST newly created survey to database
app.post("/addSurvey", async (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("test_surveys");
    dbo.collection("surveys").insertOne(req.body,
      function (err, result) {
        if (err)
          throw err;
        res.json(result);
        db.close();
      });
  });
});


