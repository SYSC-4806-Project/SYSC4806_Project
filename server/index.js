require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '..', 'public');
const bodyParser = require("body-parser");



 
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Configure express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const { MongoClient } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION_STRING ; // replace with url string for local developlment
const client = new MongoClient(uri);



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

async function getResponses(){
  try{
    await client.connect();    
      const database = await client.db('test_surveys');
      const surveys = await database.collection('survey_responses')
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
app.get("/responses", async (req, res) => {
  let response = await getResponses().catch(console.dir)      
  res.json({response: response});
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

//return the react application
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
 console.log(`Server is up on port ${port}!`);
});