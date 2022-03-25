import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Login from './Login'

const SignupDialog = ({open, handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <h1 style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 50,
                fontWeight: 'lighter',
                marginBottom: -30,
                color: 222,
            }}>Log in</h1>
            <Login handleClose={handleClose}/>
        </Dialog>
    );
};

export default SignupDialog;