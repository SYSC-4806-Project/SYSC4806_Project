import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'

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

const Login = ({handleSnackbarOpen, handleClose}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        axios.get("/userAuth/" + userName + "-" + password).then(response => {
            if (response.data.response === "Approved") {
                sessionStorage.setItem('logged_in_user', userName)
                        //redirect to staff page
                        document.location.href = '/Home'
            } else if (response.data.response === "Denied") {
                console.log("fail to authenticate")
            }
        });
        handleSnackbarOpen("login")
        handleClose();
    };

    return (
            <Grid container direction='column' rowSpacing={3} justifyContent='center' alignItems='center'>
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
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </Grid>
                <Grid item>
                    <Grid container justifyContent='center' alignItems='center' spacing={2}>
                        <Grid item>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    );
};

export default Login;