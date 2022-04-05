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
            <>
        <div className="App"  style={{padding:80}}>This survey is no longer active. Please check out the results</div>
            <Link to={{pathname:`/response/${survey.id}`}} >

                <Button variant="contained">
                    Results
                </Button>
            </Link>
            <Link to={{pathname:`/surveys/`}} >

            <Button variant="contained" color='secondary'>
                Return to survey viewer
            </Button>
            </Link>
        </>
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

        <div style={{marginTop:80}}>
            
            {questionComponents}    
            <Button onClick={handleSubmitSurvey} variant="contained">Submit Answers</Button>
            
        </div>
    );
};

export default Survey;