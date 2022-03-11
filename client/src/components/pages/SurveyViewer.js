import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";
import axios from 'axios';

const SurveyViewer = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/surveys").then(response => {
          setSurveys(response.data.response);
          setLoading(false);
        });
      }, []);
    
        if (isLoading) {
            return <div className="App"  style={{padding:80}}>Loading...</div>;
          }
      return (
        <div style={{marginTop:80}} >
          {surveys.map((elem,i) => (
            <Grid
              container
              padding={1.5}
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >              
                <Grid item xs={3} key={i}>
                  <Card>
                    <CardHeader
                      title={`Survey ${elem.id}`}                      
                    />
                    <CardContent>
                    <Link to={{pathname:`/surveys/${elem.id}`, query: {elem}}} >
                        <Button  variant="contained">Fill out this survey</Button>
                    </Link>
                    </CardContent>
                  </Card>
                </Grid>
              
            </Grid>
          ))}
        </div>
      );
};

export default SurveyViewer;