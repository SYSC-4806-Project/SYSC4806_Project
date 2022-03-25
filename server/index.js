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

//api endpoint called to search 
app.get("/search/:searchterm-:searchtype", async (req, res) => {
  const message = await search(req.params.searchterm, req.params.searchtype); 
  res.json({status: message})
})

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

async function search(search, type){
  try{
      await client.connect();
      const database = await client.db('test_surveys');
      const surveys = await database.collection('surveys')
      var query = ""
      if(type == "id"){
          query = {id: Number(search)};
      }
      else if(type == "username"){
        query = {id: search};
      }
      else if(type == "title"){
        query = {id: search};
      }
    
      const survey = await surveys.find(query).toArray();
      return survey
  }finally{
      //ensure that client will close when you finish/error
      await client.close();
  }
}


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

async function authUser(uName, pWord){
  try{
    await client.connect();
      const database = await client.db('Users');
      const users = await database.collection('Users')
      const user = await users.find({
        $and: [ 
          {username: uName},
          {password: pWord}
        ]
      }).toArray()
      if(user.length == 1){
        return 1
      } else {
        return 0
      }

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


// Make request to authenticate user
app.get("/userAuth", async (req, res) => {
  username = req.body.username
  password = req.body.password
  let response

  if(authUser(username, password) == 1){
     response = "Approved"
  } else{
    response = "Denied"
  }
  
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

// POST new users to database
app.post("/addUser", async (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("Users");
    dbo.collection("Users").insertOne(req.body,
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
  res.sendFile(path.resolve(__dirname, '../client/build', 'signupButton.html'));
});

app.listen(port, () => {
 console.log(`Server is up on port ${port}!`);
});
