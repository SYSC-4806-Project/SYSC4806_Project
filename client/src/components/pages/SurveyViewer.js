import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

//mui imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button' 
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
const SurveyViewer = () => {
      const [surveys, setSurveys] = useState([]);
      const [isLoading, setLoading] = useState(true)
      const [selectedFilter, setSelectedFiler] = useState("Survey ID")
      const [value, setValue] = useState('id')
      const [searchTerm, setSearchTerm] = useState("")

      useEffect(() => {
          let user = sessionStorage.getItem("logged_in_user") 
          axios.get("/surveys/" + user).then(response => {
            setSurveys(response.data.response.reverse());
            setLoading(false);
          });
      }, []);
      
      if (isLoading) {
            return <div className="App"  style={{padding:80}}>Loading...</div>;
      }

      const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
      }
      const handleFilterChange = (event) => {
            setValue(event.target.value);
      };

      const Search = () => {
         //configure endpoint info
         let config = {method: 'get', url: '/search/' + searchTerm + "-" + value}
         console.log("term", searchTerm)
         console.log("value", value)
         let reply
         //call api amd save result to variable
         axios(config)
         .then(function (response) {
             reply = (response.data);
             setSurveys(reply.status.reverse()); 
             console.log(reply.status)
         })
         .catch(function (error) {
             console.log("error", error);
         });
      
      }

      return (
        <div style={{marginTop:80}} >
             <Grid
              container
              padding={1.5}
              spacing={3}
              direction="column"
              justify="flex-start"
              alignItems="center"
            >        
            <Grid item xs={12}>
              <Paper elevation={10} style={{background: 'rgba(255, 255, 255, 0.90)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
              <Grid container spacing={2} justifyContent='center' alignItems='center' style={{marginTop: 10}}>
                <Grid item >
                  <TextField onChange={handleSearchChange} label={selectedFilter}/>
                </Grid>
                <Grid item >
                  <Button variant="contained" onClick={Search}>Search</Button>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Search By:</FormLabel>
                        <RadioGroup
                            row
                            value={value}
                            onChange={handleFilterChange}
                        >
                           <FormControlLabel value="id" control={<Radio />} label="Id" />
                           <FormControlLabel value="title" control={<Radio />} label="Title" />
                           <FormControlLabel value="username" control={<Radio />} label="Username" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
              </Grid>
              </Paper>
            </Grid>
          
          {surveys.length > 0 ? <>  { surveys.map((elem,i) => (
                <Grid item xs={4} key={i}>
                  <Card elevation={10} style={{width: "400px"}}>
                    <CardHeader
                      title={`${elem.title}`} subheader={`Survey ${elem.id}`}                      
                    />
                    <CardContent>
                    <Grid container justifyContent='center' alignItems='center' spacing={2}>
                      <Grid item>
                        <Button  href={`/complete/${elem.id}`} variant="contained">Fill out this survey</Button>
                      </Grid>
                      <Grid item>
                        <Button href={`/responses/${elem.id}`} color="secondary" variant="contained">See responses</Button>
                      </Grid>
                    </Grid>
                    </CardContent>
                  </Card>
            </Grid>))}</>
          : <Typography>No Surveys Correspond to Given Seach Term </Typography>}  
         </Grid>
        </div>
      );
};

export default SurveyViewer;