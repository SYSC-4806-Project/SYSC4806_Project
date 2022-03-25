import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Signup from './Signup'

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
            }}>Sign up</h1>
            <Signup handleClose={handleClose}/>
        </Dialog>
    );
};

export default SignupDialog;