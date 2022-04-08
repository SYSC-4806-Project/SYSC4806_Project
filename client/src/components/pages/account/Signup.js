import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import {omit} from 'lodash'

import axios from "axios";

const Signup = ({handleSnackbarOpen, handleClose}) => {
    let userNameLabel = "Username";
    let emailLabel = "Email";
    let passWordLabel = "Password";

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: "Username should not be empty",
        email: "Email should not be empty",
        password: "Password should not be empty",
    });
    const [userExists, setUserExists] = useState(false);

    const search = user => {
        //configure endpoint info
        let config = {method: 'get', url: '/userexist/' + user}
        console.log("searching")

        axios(config)
            //     axios.get("/userexist/" + user)
            .then(function (response) {
                console.log("inside")
                if (response.data.response === "Approved") {
                    setUserExists(true);
                } else {
                    setUserExists(false);
                }

            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log(userName, email, password);

        if (Object.keys((errors)).length === 0 && userExists === false) {
            search(userName)
            if (userExists) {
                alert("user exist")
            } else {
                let accountInfo = {username: userName, email: email, password: password}
                axios.post("/addUser", accountInfo)

                handleSnackbarOpen("signup", userName)
                handleClose();
            }
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

            case 'Email':
                if (
                    !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;

            case 'Password':
                if (
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        password: 'Password should contains at least 8 characters and containing uppercase,lowercase and numbers'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

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
        } else if (label == "Email") {
            setEmail(val)
        } else {
            setPassword(val)
        }
    }

    return (
        <>
            <Grid container direction="column" rowSpacing={3} alignItems='center' justifyContent='center' width='300px'>
                <Grid item>
                    <TextField
                        label={userNameLabel}
                        variant="filled"
                        required
                        value={userName}
                        onChange={e => handleChange(e, userNameLabel)}
                    />
                </Grid>
                <p style={{color: 'red'}}>{errors.username}</p>
                <Grid item>
                    <TextField
                        label="Email"
                        variant="filled"
                        type="email"
                        required
                        value={email}
                        onChange={e => handleChange(e, emailLabel)}
                    />
                </Grid>
                <p style={{color: 'red'}}>{errors.email}</p>
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
                    <Grid container spacing={2} direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Signup;