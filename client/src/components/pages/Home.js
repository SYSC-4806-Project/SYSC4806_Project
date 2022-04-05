import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import SignupDialog from "./account/SignupDialog";
import LoginDialog from "./account/LoginDialog";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';


const Home = () => {

    const [LoginOpen, setLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [userExists, setUserExists] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setUserExists(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
  }

  const Search = () => {
    //configure endpoint info
    let config = {method: 'get', url: '/userexist/' + searchTerm}
    let reply
    //call api amd save result to variable
    axios(config)
    .then(function (response) {
        if(response.data.response==="Approved"){
            setUserExists(true); 
        }
        else{
            setUserExists(false); 
        }

    })
    .catch(function (error) {
        console.log("error", error);
    });
 }

 useEffect(()=>{
    if(userExists){
        handleClickOpen();
    }
},[userExists]
 )

    return (
        <div className="Homepage" style={{marginTop: 100}}>
            <div>
                <br></br>
                <h1>Welcome to Mini Survey Monkey!</h1>
            </div>
            <div className="homeButtons">
                <Stack style={{display: "contents" }} spacing={2} direction="row">
                <Link to="/addsurvey">
                     <Button variant="contained">Create Survey</Button>
                </Link>
                <Link to="/surveys">
                    <Button variant="outlined">See Surveys</Button>
                </Link>
                </Stack>        
            </div>
            <div className="searchProfiles" style={{marginTop:20}}>
                <TextField onChange={handleSearchChange} label="search a profile"/>
                <Button onClick={Search} variant="contained" >Search</Button>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Found a matching user!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Visit their profile?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Link to={{pathname:`/profiles/${searchTerm}`}} >
                    <Button onClick={handleClose} autoFocus>
                    Visit
                    </Button>
                </Link>
                <Button onClick={handleClose} autoFocus>
                    Exit
                </Button>
                </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Home;


