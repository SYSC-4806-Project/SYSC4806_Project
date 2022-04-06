import React, {useState} from 'react'
import transparency from "../media/transparency.png"

import Grid from '@mui/material/Grid'
import SignupDialog from "./account/SignupDialog";
import LoginDialog from "./account/LoginDialog";
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import "@fontsource/roboto";

const LoginPage = () => {
    
    const [LoginOpen, setLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);
    const [signupBarOpen, setSignupBarOpen] = useState(false)
    const [loginBarOpen, setLoginBarOpen] = useState(false)

    const handleOpen = (type, username)=>{
        if(type=="login"){
            setLoginBarOpen(true)
        }
        else if(type=="signup"){
            setSignupBarOpen(true)
        }
        sessionStorage.setItem('logged_in_user', username)
        document.location.href = '/Home'
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoginBarOpen(false)
        setSignupBarOpen(false)
    }

    return(
    <>
    <Grid container style={{height: '100vh'}} alignItems='center' justifyContent='center'>
        <Grid item>
            <Paper elevation={10} style={{ background: 'rgba(255, 255, 255, 0.85)', width: 400, padding: 20, border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
            <Grid container spacing={2} alignItems='center' justifyContent='center'>
                <Grid item>
                    <Typography variant='h5'style={{opacity: 1, color: "#1a237e", marginBottom: 10, fontWeight: 700, fontFamily: "Segoe UI"}}>
                        Welcome to Mini Survey-Monkey
                    </Typography>
                    <Typography elevation={4} style={{opacity: 1, fontFamily: 'Segoe UI', fontWeight: 500}} variant='h7'>
                        Please sign in or make an account to begin creating, and exploring surveys!
                    </Typography>
                </Grid>
                <Grid item>
                    <Button style={{opacity: 1}} variant="contained" color="primary" onClick={() => {setSignupOpen(true)}}>
                        Sign Up
                    </Button>
                    <SignupDialog handleSnackbarOpen={handleOpen} open={SignupOpen} handleClose={() => {setSignupOpen(false)}} />
                </Grid>
                <Grid item style={{opacity: 1}}>
                    <Button  style={{opacity: 1}} variant="contained" color="primary" onClick={() => {setLoginOpen(true)}}>
                        Log In
                    </Button>
                    <LoginDialog handleSnackbarOpen={handleOpen} open={LoginOpen} handleClose={() => {setLoginOpen(false)}} />
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    </Grid>
    <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={signupBarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Sign up successful!
        </Alert>
    </Snackbar>
    <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={loginBarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Log in successful!
        </Alert>
    </Snackbar>
    </>
    )
}
export default LoginPage