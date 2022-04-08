import React from 'react'
import "./About.css";
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const About = () => {
  return (
    <Grid container justifyContent='center' alignItems='center'>
    <Grid item >
    <Paper elevation={10} style={{padding: 20, marginTop: 150, height: 450,  background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
    <div className="title">
      <h1>SYSC4806_Project - Mini Survey Monkey</h1>
        <div className="members">
        
          <h3 className="h3">Emmitt Luhning</h3>
          <h3 className="h3">Marko Majkic</h3>
          <h3 className="h3">Defa Hu</h3>
          <h3 className="h3">Josh Downing</h3>
          <h3 className="h3">Amith Kumar Das Orko</h3>
          <a className="link" href={"https://github.com/SYSC-4806-Project/SYSC4806_Project"}>
                <h3>Github Repository</h3>
            </a>
        </div>
      </div>
      </Paper>
      </Grid>
      </Grid>
);
}

export default About

