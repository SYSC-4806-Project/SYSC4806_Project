import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'


import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '& .MuiTextField-root': {
            width: '300px',
        },
    
    },
}));

const Signup = ({handleSnackbarOpen, handleClose}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
     
        console.log(userName, email, password);
  
        let accountInfo = {username: userName, email: email, password: password}
        axios.post("/addUser", accountInfo)
       
        handleSnackbarOpen("signup", userName)
        handleClose();
    };

    return (
        <>
        <Grid container direction="column" rowSpacing={3}  alignItems='center' justifyContent='center'>
            <Grid item>
                <TextField
                    label="Username"
                    variant="filled"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Grid container spacing={2} direction='row' justifyContent='center' alignItems='center'>
                    <Grid item>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
};

export default Signup;