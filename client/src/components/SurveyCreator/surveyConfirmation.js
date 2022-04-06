import React from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
const SurveyConfirmation = (props) => {
    const {type} = props
    return (
    <Grid container justifyContent='center' alignItems='center' style={{marginTop: 200}}>
        <Grid item>
            <Paper elevation={10} style={{width: 350, padding: 20, background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                <Grid container justifyContent='center' alignItems='center' spacing={3}>
                    <Grid item xs={12}>
                        <Typography style={{ color: "black", fontWeight: 500, fontFamily: "Segoe UI"}} variant="h5" >Sucessfully {type} a survey!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CheckCircleOutlineIcon elevation={10} style={{fontSize: 80}}color='success'></CheckCircleOutlineIcon>
                    </Grid>
                    <Grid item xs={6}>
                        <Button href="/home" variant='contained'>Return Home</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button href="/surveyviewer" variant='contained'>Explore Surveys</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
    )
}
export default SurveyConfirmation