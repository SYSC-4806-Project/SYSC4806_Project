import React, {useState} from 'react'
import Grid from '@mui/material/Grid'
import SignupDialog from "./account/SignupDialog";
import LoginDialog from "./account/LoginDialog";
import Button from '@mui/material/Button'


const LoginPage = () => {
    
    const [LoginOpen, setLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);


    return(
    <Grid container spacing={2} style={{marginTop: 150}}  justifyContent='center'>
        <Grid item>
            <Button variant="contained" color="primary" onClick={() => {setSignupOpen(true)}}>
                Signup
            </Button>
            <SignupDialog open={SignupOpen} handleClose={() => {setSignupOpen(false)}} />
        </Grid>
        <Grid item>
            <Button variant="contained" color="primary" onClick={() => {setLoginOpen(true)}}>
                Login
            </Button>
            <LoginDialog open={LoginOpen} handleClose={() => {setLoginOpen(false)}} />
        </Grid>
    </Grid>
    )
}
export default LoginPage