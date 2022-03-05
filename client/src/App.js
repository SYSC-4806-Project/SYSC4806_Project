import React, { useEffect, useState } from 'react';
import './App.css';
import CustomNavbar from "./components/Navbar/Navbar"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


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
      < CustomNavbar />
      <div>
        <br></br>
        <h1>Welcome to Mini Survey Monkey!</h1>
      </div>
      <div className="homeButtons">
        <Stack style={{display: "contents" }} spacing={2} direction="row">
          <Button variant="contained">Create Survey</Button>
          <Button variant="outlined">See Surveys</Button>
        </Stack>
      </div>

    </div>
  );
}

export default App;
