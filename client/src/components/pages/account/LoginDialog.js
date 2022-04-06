import React from 'react';
import Dialog from '@mui/material/Dialog';
import Login from './Login'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const SignupDialog = ({handleSnackbarOpen, open, handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <Grid container style={{padding: 20}} direction='column'>
                <Grid item>
                <h1 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 50,
                    fontWeight: 'lighter',
                    color: 222,
                }}>Log in</h1>
                </Grid>
                <Grid item>
                <Login handleSnackbarOpen={handleSnackbarOpen} handleClose={handleClose}/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default SignupDialog;