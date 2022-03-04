import React, { useEffect, useState } from 'react';
import './App.css';
import CustomNavbar from "./components/Navbar/Navbar"
import { Button } from 'react-bootstrap';


function App() {
  const [data, setData] = useState(null);

  let axios = require('axios')

  useEffect(
    () => {
      //configure endpoint info
      let config = { method: 'get', url: '/testDatabase/' }

      //call api amd save result to variable
      axios(config)
        .then(function (response) {

          setData(response.data.response)
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  )
  return (
    <div className="App">
        < CustomNavbar/>
        <div>
          <br></br>
          <h1>Welcome to Mini Survey Monkey!</h1>
        </div>
        <div className="homeButtons">
          <Button style={{marginRight: "1rem"}} variant="outline-dark">Create a Survey</Button>
          <Button style={{marginLeft: "1rem"}}variant="outline-dark">See Surveys</Button>
        </div>
        
    </div>
  );
}

export default App;
