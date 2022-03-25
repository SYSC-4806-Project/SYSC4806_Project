import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import SignupDialog from "./account/SignupDialog";
import LoginDialog from "./account/LoginDialog";
import Grid from '@mui/material/Grid'

const Home = () => {

    const [LoginOpen, setLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);

    return (
        <div className="Homepage" style={{marginTop: 100}}>
            <div>
                <br></br>
                <h1>Welcome to Mini Survey Monkey!</h1>
                </div>
                <div className="homeButtons">
                <Stack style={{display: "contents" }} spacing={2} direction="row">
                <Link to="/addsurvey">
                     <Button variant="contained">Create Survey</Button>
                </Link>
                <Link to="/surveys">
                    <Button variant="outlined">See Surveys</Button>
                </Link>
                </Stack>
            </div>
        </div>
    );
};

export default Home;


