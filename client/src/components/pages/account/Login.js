import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
    import {omit} from 'lodash'

import axios from "axios";

const Login = ({handleSnackbarOpen, handleClose}) => {
    let userNameLabel = "Username";
    let passWordLabel = "Password";

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: "Username should not be empty",
        password: "Password should not be empty",
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (Object.keys((errors)).length === 0) {
            axios.get("/userAuth/" + userName + "-" + password).then(response => {
                if (response.data.response === "Approved") {

                    handleSnackbarOpen("login", userName)
                } else if (response.data.response === "Denied") {
                    console.log("fail to authenticate")
                }
            });

            handleClose();
        } else {
            alert("There are errors")
        }
    };

    const validate = (event, name, value) => {
        switch (name) {
            case 'Username':
                console.log("validating in username")
                if (value.length == 0) {
                    setErrors({
                        ...errors,
                        username: 'Username should not be empty'
                    })
                } else if (value.length <= 5) {
                    setErrors({
                        ...errors,
                        username: 'Username should at least have 5 letters'
                    })
                } else if (new RegExp(/\s/).test(value)) {
                    setErrors({
                        ...errors,
                        username: 'Username should not contains space'
                    })
                } else if (new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(value)) {
                    setErrors({
                        ...errors,
                        username: 'Username should not contains special character'
                    })
                } else {
                    let newObj = omit(errors, "username");
                    setErrors(newObj);

                }
                break;

            case "Password":
                if (value.length == 0) {
                    setErrors({
                        ...errors,
                        username: 'Password should not be empty'
                    })
                } else {
                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
            default:
                break;
        }
    }

    const handleChange = (event, label) => {
        event.persist();

        let name = label;
        let val = event.target.value;

        validate(event, name, val);

        if (label == "Username") {
            setUserName(val)
        } else {
            setPassword(val)
        }
    }


    return (
        <Grid container direction='column' rowSpacing={3} justifyContent='center' alignItems='center' width='300px'>
            <Grid item>
                <TextField
                    label="Username"
                    variant="filled"
                    required
                    value={userName}
                    onChange={e => handleChange(e, userNameLabel)}
                />
            </Grid>
            <p style={{color: 'red'}}>{errors.username}</p>
            <Grid item>
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => handleChange(e, passWordLabel)}
                />
            </Grid>
            <p style={{color: 'red'}}>{errors.password}</p>
            <Grid item>
                <Grid container justifyContent='center' alignItems='center' spacing={2}>
                    <Grid item>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;