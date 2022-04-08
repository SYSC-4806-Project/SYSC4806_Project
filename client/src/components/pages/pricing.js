import React from 'react'
import "./Pricing.css";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Pricing = () => {
    return (
       <Grid container justifyContent='center' alignItems='center'>
        <Grid item >
                <Paper elevation={10} style={{width: "100%", marginTop: 100,  background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                <div className="App">
                <div className="table centered">
                    <div className="row">
                    <div className="column">
                        <ul className="price">
                        <li >
                            <br />
                            <br />
                            <br />
                            <br />
                            Optical visualization
                        </li>
                        <li>Open ended survey</li>
                        <li>Ranged survey</li>
                        <li>Multi Choice survey</li>
                        <li>No ads</li>
                        <li>Unlimited survey storage</li>
                        </ul>
                    </div>
            
                    <div className="column">
                        <ul className="price">
                        <li className="header">
                            Community
                            <br />
                            <div className="button_cont" align="center">
                            <a className="btn" target="_blank" rel="nofollow noopener">
                                $0
                            </a>
                            </div>
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <ImCross color="red" />
                        </li>
                        <li>
                            <ImCross color="red" />
                        </li>
                        <li>
                            <ImCross color="red" />
                        </li>
                        </ul>
                    </div>
            
                    <div className="column">
                        <ul className="price">
                        <li className="header">
                            Professional
                            <br />
                            <div className="button_cont" align="center">
                            <a className="btn" target="_blank" rel="nofollow noopener">
                                $ 4.99
                            </a>
                            </div>
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <ImCross color="red" />
                        </li>
                        <li>
                            <ImCross color="red" />
                        </li>
                        </ul>
                    </div>
            
                    <div className="column">
                        <ul className="price">
                        <li className="header">
                            Premium
                            <br />
                            <div className="button_cont" align="center">
                            <a className="btn" target="_blank" rel="nofollow noopener">
                                $19.99
                            </a>
                            </div>
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        <li>
                            <FaCheck color="green" />
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
                </Paper>
            </Grid>
        </Grid>
      );
    }

export default Pricing