require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');



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
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
run().catch(console.dir);


app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });
 
app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});