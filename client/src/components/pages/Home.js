import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import ConstructionIcon from '@mui/icons-material/Construction';

const Home = () => {

    const [LoginOpen, setLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);

    return (
            <Grid container spacing={4} justifyContent='center' alignItems='center' style={{marginTop: 200, marginBottom: 100}}>
                <Grid item>
                    <Paper elevation={10} style={{minHeight: "200px", width: "400px", padding: 20,  background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>  
                        <Grid item>
                            <Grid container direction='column' alignItems='center' justifyContent='center' spacing={3}>
                               <Grid item>
                                    <ConstructionIcon fontSize="large" ></ConstructionIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5' style={{ color: "black", fontWeight: 500, fontFamily: "Segoe UI"}}>
                                        Use our survey builder to create your own survey</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h7' style={{ color: "black", fontWeight: 500, fontFamily: "Segoe UI"}}>
                                        Add number range, multiple choice, and open ended questions</Typography>
                                </Grid>
                                <Grid item>
                                    <Button href='/addsurvey' variant="contained">Create Survey</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item >
                    <Typography variant='h3' style={{ color: "black", fontWeight: 780, fontFamily: "Segoe UI"}}>Or.</Typography>
                </Grid>
                <Grid item >
                    <Paper elevation={10} style={{minHeight: "200px", width: "400px" , padding: 20, background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                        <Grid item>
                            <Grid container spacing={3} direction='column' alignItems='center' justifyContent='center'>
                                <Grid item>
                                    <SearchIcon fontSize="large" ></SearchIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5' style={{color: "black", fontWeight: 500, fontFamily: "Segoe UI"}}>
                                        Explore the surveys that other users have made</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h7' style={{ color: "black", fontWeight: 500, fontFamily: "Segoe UI"}}>
                                        Search by title, survey ID or user, and view analytics for public surveys</Typography>
                                </Grid>
                                <Grid item>
                                    <Button href="/surveyviewer" variant="contained">See Surveys</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
    )
}

export default Home;


