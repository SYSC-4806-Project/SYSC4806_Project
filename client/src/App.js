import React, {useEffect, useState} from 'react'; 
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null); 

  let axios = require('axios')

  useEffect(
    ()=>{
       //configure endpoint info
       let config = {method: 'get', url: '/testDatabase/'}
        
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
      <header className="App-header">
        {data}
        <br></br>
        SYSC 4806 PROEJCT
      </header>
    </div>
  );
}

export default App;
