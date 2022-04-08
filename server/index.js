require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '..', 'public');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Configure express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const { MongoClient } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION_STRING; // replace with url string for local developlment
const client = new MongoClient(uri);

//api endpoint called to search 
app.get("/search/:searchterm-:searchtype", async (req, res) => {
  const message = await search(req.params.searchterm, req.params.searchtype);
  res.json({ status: message })
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

async function getResponses() {
  try {
    await client.connect();
    const database = await client.db('test_surveys');
    const surveys = await database.collection('survey_responses')
    const survey = await surveys.find({}).toArray();
    return survey
  } finally {
    //ensure that client will close when you finish/error
    await client.close();
  }
}
//create enpoints for API we will use to request information
//From backend
//req = request, res = response
app.get("/responses", async (req, res) => {
  let response = await getResponses().catch(console.dir)
  res.json({ response: response });
});

async function search(search, type) {
  try {
    await client.connect();
    const database = await client.db('test_surveys');
    const surveys = await database.collection('surveys')
    var query = ""
    if (type == "id") {
      query = { id: Number(search) };
    }
    else if (type == "username") {
      console.log("type", type)
      query = { username: search.toString() };
    }
    else if (type == "title") {
      query = { title: search };
    }

    const survey = await surveys.find(query).toArray();
    return survey
  } finally {
    //ensure that client will close when you finish/error
    await client.close();
  }
}

async function getSurveys(user) {
  try {
    await client.connect();
    const database = await client.db('test_surveys');
    const surveys = await database.collection('surveys')
    const survey = await surveys.find({ $or: [ { private: false }, { username: user } ] }).toArray();
    return survey

  } finally {
    //ensure that client will close when you finish/error
    await client.close();
  }
}

async function authUser(uName, pWord) {
  try {
    await client.connect();
    const database = await client.db('Users');
    const users = await database.collection('Users')


    const user = await users.find({
      $and: [
        { username: uName },
      ]
    }).toArray()
    console.log(user);

    if (user.length == 1) {
      if (bcrypt.compareSync(pWord, user[0].password)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  } finally {
    //ensure that client will close when you finish/error
    await client.close();
  }
}

//create enpoints for API we will use to request information
//From backend
//req = request, res = response
app.get("/surveys/:username", async (req, res) => {
  let currUser = req.params.username
  let response = await getSurveys(currUser).catch(console.dir)
  res.json({ response: response });
});

// Make request to authenticate user
app.get("/userAuth/:username-:password", async (req, res) => {
  username = req.params.username
  password = req.params.password

  let response

  if (await authUser(username, password) == 1) {
    response = "Approved"
  } else {
    response = "Denied"
  }

  res.json({ response: response });
});

//api endpoint called to check if user exists 
app.get("/userexist/:username", async (req, res) => {
  let response
  if (await checkUserExists(req.params.username) == 1) {
    response = "Approved"
  } else {
    response = "Denied"
  }

  res.json({ response: response });
})

//PATCH survey active status
app.patch("/active/:id-:active", async (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("test_surveys");
    dbo.collection("surveys").updateOne({ "id": Number(req.params.id) }, { $set: { "active": false } })
      .then((obj) => {
        console.log('Updated - ' + obj);
        res.redirect('orders')
      })
      .catch((err) => {
        console.log('Error: ' + err);
      })
  })
})

async function checkUserExists(username) {
  try {
    await client.connect();
    const database = await client.db('Users');
    const users = await database.collection('Users')

    const user = await users.find({
      username: username
    }).toArray()
    if (user.length == 1) {
      return true
    } else {
      return false
    }

  } finally {
    //ensure that client will close when you finish/error
    await client.close();
  }
}

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
  await MongoClient.connect(uri, async function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("Users");

    let hash = bcrypt.hashSync(req.body.password, 10);
    secureUserJSON = { username: req.body.username, email: req.body.email, password: hash }

    await dbo.collection("Users").insertOne(secureUserJSON,
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

