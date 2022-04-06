import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Signup from './Signup'
import Grid from '@mui/material/Grid'


const SignupDialog = ({handleSnackbarOpen, open, handleClose}) => {
 
    return (
        <>
        <Dialog open={open} onClose={handleClose}>
            <Grid container direction='column' justifyCotent='center' alignItems='center' style={{padding: 20}}>
                <Grid item>
                <h1 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 50,
                    fontWeight: 'lighter',
                    color: 222,
                }}>Sign up</h1>
                </Grid>
                <Grid item>
                     <Signup handleSnackbarOpen={handleSnackbarOpen} handleClose={handleClose}/>
                </Grid>
            </Grid>
        </Dialog>
         </>
    );
};

export default SignupDialog;