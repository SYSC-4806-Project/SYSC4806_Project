import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper'

const styles = {
  mainContainer: {
    background: "#234",
    height: "100%",
    overflowY: "Scroll",
  },
  cardContainer: {
    maxWidth: 345,
    margin: "3rem auto",
  },
};


const Profile = () => {
  const [surveys, setSurveys] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {username} = useParams();
  let loggedInUser = sessionStorage.getItem("logged_in_user")

  useEffect(() => {
    let config = {method: 'get', url: '/search/' + username + "-" + "username"}
    let reply
    axios(config)
    .then(function (response) {
        reply = (response.data);
        setSurveys(reply.status.reverse()); 
        setLoading(false);

    })
    .catch(function (error) {
        console.log("error", error);
    });
  }, []);



if (isLoading) {
    return <div className="App"  style={{padding:80}}>Loading...</div>;
}

const updateActiveStatus = (survey_id) => {
  //configure endpoint info
  let config = {method: 'patch', url: '/active/' + survey_id + "-false"}
  let reply
  axios(config)
  .then(function () {
    
  })
  .catch(function (error) {
      console.log("error", error);
  });
}

let buttons = (survey_id) => {
  let personal = () =>{
    if(loggedInUser===username){
      return (<>
          <Button onClick={()=>{updateActiveStatus(survey_id);handleClickOpen()}} size="small" color="primary">
            Close Survey
          </Button>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Notice"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This survey is now closed. Users will no longer be able to fill it out and the answer visualization will be generated.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        </>
      )
      }
    }
  return(
    <CardActions>
    
      <Button href={`/surveys/${survey_id}`} size="small" color="primary">
        Fill out
      </Button>
    
    
      <Button href={`/responses/${survey_id}`} size="small" color="primary">
        Results
      </Button>
    
      {personal()}
    </CardActions>

  )  
}

  return (
    <div style={{padding:80}}>
    <Card  elevation={10} style = {styles.cardContainer}>
        <CardContent>
            <Typography variant="h5" gutterBottom>
            {username}'s Profile
            </Typography>
            <Typography variant="body2" color="textSecondary">
            Check out their surveys below!
            </Typography>
        </CardContent>
    </Card>
   
        <Paper elevation={10} style={{padding:20,  background: '#234', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
        <Box component="div"  elevation={10} style = {styles.mainContainer}>
        <Grid container justify="center">
            {/* surveys */}
            {surveys.map((survey, i) => (
            <Grid item xs={12} sm={8} md={4} key={i}>
                <Card  elevation={10} style = {styles.cardContainer}>
                <CardActionArea>
                    <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {survey.title}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {buttons(survey.id)}
                </Card>
            </Grid>
            ))}
        </Grid>
        </Box>
      </Paper>
    </div>  
  );
};

export default Profile;
