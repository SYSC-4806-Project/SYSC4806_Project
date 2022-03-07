import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="Homepage">
            <div>
                <br></br>
                <h1>Welcome to Mini Survey Monkey!</h1>
                </div>
                <div className="homeButtons">
                <Stack style={{display: "contents" }} spacing={2} direction="row">
                <Button variant="contained">Create Survey</Button>
                <Link to="/surveys">
                    <Button variant="outlined">See Surveys</Button>
                </Link>
                </Stack>
            </div>
        </div>
    );
};

export default Home;


