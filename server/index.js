require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

 
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING ; // replace with url string for local developlment
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db('sysc4806');
      const surveys = database.collection('surveys');
      // Query for a survey with test field that has content "test"
      const query = { test: 'test' };
      const survey = await surveys.findOne(query);
      console.log(survey);

      return survey 
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
run();
//create enpoints for API we will use to request information
//From backend
//req = request, res = response
app.get("/testDatabase/", async (req, res) => {
    let response = run().catch(console.dir)      
    res.json({response: "server response"});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });
 
app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});