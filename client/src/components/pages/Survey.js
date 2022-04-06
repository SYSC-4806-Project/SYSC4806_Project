import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import axios from 'axios';
import Paper from '@mui/material/Paper'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { SettingsApplicationsRounded } from '@material-ui/icons'

const Survey = () => {
    const [response, setResponse] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [surveys, setSurveys] = useState({})
    const { id } = useParams();

    useEffect(() => {
        let config = {method: 'get', url: '/search/' + id + "-id"}
        let reply
        //call api amd save result to variable
        axios(config)
        .then(function (response) {
            reply = (response.data);
            setSurveys(reply.status.reverse());
            setLoading(false);
        })
        .catch(function (error) {
            console.log("error", error);
        });
        }, []);

    if (isLoading) {
        return <div className="App"  style={{padding:80}}>Loading...</div>;
      }
    
    let survey = surveys[0];

    if(!survey.active){
        return (
            <Grid container direction='column' justifyContent='center' alignItems='center' style={{marginTop: 200}}>
            <Paper elevation={10} style={{width: 400, padding: 20}}>
                <Grid container spacing={4} direction='column'>
                    <Grid item>
                    <Typography>This survey is no longer active. Please check out the results</Typography>
                    </Grid>
                    <Grid item>
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item>
                        <Button href={`/responses/${survey.id}`} variant="contained">
                                Results
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button href={`/surveyviewer/`} variant="contained" color='secondary'>
                            Return to survey viewer
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
            </Grid>
        )
    }
    
    async function handleSubmitSurvey(){
        let user = sessionStorage.getItem("logged_in_user")

        delete survey._id
        survey.questions.map((obj,i)=>{
            obj["response"]= response[i]
            obj["username"] = user
        })

        const res = await axios.post("/addResponses", survey)
        document.location.href="/surveyconfirmation-completed"
    }
    
    let questionComponents= survey.questions.map((obj,i)=>{
        if(obj.type==1){
            return(
                <div className={"row"} key={i} style={{padding:30}}> 
                <Grid item xs={12}>
                <Typography>{obj.question}</Typography>
                <TextField onChange={e =>
           response[i] = e.target.value} style={{width: 400}} variant="filled" label="Answer Field"></TextField>
                </Grid>
                </div>
            )
        }
        else if(obj.type==2){
            let answers = obj.answers.map((answer,index) => {
                return(
                    <div className={"row"} key={index}> 
                    <FormControlLabel value={answer}control={<Radio />} label={answer} />
                    </div>
                )
            })
            return(
                <div className={"row"} key={i} style={{padding:30}}> 
                <Grid item xs={12}>
                    <Typography>{obj.question}</Typography>
                </Grid>
                <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        name="position"
                        onChange={e => 
                            response[i] = e.target.value}
                    >
                        {answers}
                    </RadioGroup>
                    </FormControl>
                </Grid>
                </div>
            )
        }
        else if(obj.type==3){
            const marks = [
                {
                  value: Number(obj.min),
                  label: `${obj.min}`,
                },
                {
                  value: Number(obj.max),
                  label: `${obj.max}`,
                },
              ];
            return(
                <div className={"row"} key={i} style={{padding:30}}> 
                <Grid item xs={12}>
                    <Typography>{obj.question}</Typography>
                    <Slider  aria-label="Temperature"
                        style={{width: 400}}
                        min={Number(obj.min)}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={e => 
                            response[i] = e.target.value}
                        max={Number(obj.max)}></Slider>
                </Grid>
                </div>
            )
        }
    })

    return (

        <Grid container justifyContent='center' alignItems='center' style={{marginTop:80}}>
            <Grid item>
                <Paper elevation={10} style={{width: 600, padding: 20, background: 'rgba(255, 255, 255, 0.85)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                {questionComponents}    
                <Button onClick={handleSubmitSurvey} variant="contained">Submit Answers</Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Survey;