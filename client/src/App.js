import React, { useEffect, useState } from 'react';
import './App.css';
import CustomNavbar from "./components/Navbar/Navbar"
import MainRouter from "./components/MainRouter"
import { ContentPasteSearchOutlined } from '@mui/icons-material';
import Background from './components/media/survey_background1.png'

function App() {
  const [data, setData] = useState(null);

  let axios = require('axios')

  useEffect(
    () => {
      //post exmaple
      // //configure endpoint info
      // let config = { method: 'post', url: '/addResponses/' }

      // //call api amd save result to variable
      // axios(config)
      //   .then(function (response) {

      //     console.log("response", response)
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });
    }
  )
  return (
    <div className="App">
      <div style={{  overflowY: 'scroll',
            overflowX: 'hidden', 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',  height: '100vh', backgroundImage: `url(${Background})`}}>
      < CustomNavbar />
      < MainRouter />
      </div>
    </div>
  );
}

export default App;
