import React, {useState, useEffect} from 'react'
import AddQuestionDialog from './addQuestionDialog'

//material ui imports 
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from "@mui/material/ListItem" 
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import AbcIcon from '@mui/icons-material/Abc';
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import ConstructionIcon from '@mui/icons-material/Construction';
import Checkbox from '@mui/material/Checkbox';

const SurveyCreator = () => {
    const [textOpen, setTextOpen] = useState(false)
    const [rangeOpen, setRangeOpen] = useState(false)
    const [multipleOpen, setMultipleOpen] = useState(false)
    const [textQuestions, setTextQuestions] = useState([]) 
    const [rangeQuestions, setRangeQuestions] = useState([])
    const [multipleQuestions, setMultipleQuestions] = useState([])
    const [title, setTitle] = useState("")
    const [priv, setPriv] = useState(true)


    let axios = require('axios')

    function handleTextOpen(){
        if(!textOpen){setTextOpen(true)}
    }
    function handleRangeOpen(){
        if(!rangeOpen){setRangeOpen(true)}
    }
    function handleMultipleOpen(){
        if(!multipleOpen){setMultipleOpen(true)}
    }
    function handleTitleChange(event){
        setTitle(event.target.value)
    }
    function handleTextClose(){
        setTextOpen(false)
    }
    function handleMultipleClose(){
        setMultipleOpen(false)
    }
    function handleRangeClose(){
        setRangeOpen(false)
    }
    function handleSubmit(type, content){
        if(type==='text'){
            let tempQuestions = textQuestions 
            tempQuestions.push(content)
            setTextQuestions(tempQuestions)
        }
        if(type==='range'){
            let tempQuestions = rangeQuestions 
            tempQuestions.push(content)
            setRangeQuestions(tempQuestions)
        }
        if(type==='multiple'){
            let tempQuestions = multipleQuestions 
            tempQuestions.push(content)
            setMultipleQuestions(tempQuestions)
        }
    }

    function handleChange() { 
        let temp = !priv
        setPriv(temp)
    } 

    async function handleCreateSurvey(){
        let questionsArr = []
        textQuestions.forEach(element => questionsArr.push(element))
        rangeQuestions.forEach(element => questionsArr.push(element))
        multipleQuestions.forEach(element => questionsArr.push(element))

        let idNum = Math.floor(Math.random() * 9000)
        let user = sessionStorage.getItem("logged_in_user")
        let surveyObject = {id: idNum, questions: questionsArr, username: user, title: title, active:true, private: priv}

        await axios.post("/addSurvey", surveyObject)
        document.location.href="/surveyconfirmation-created"
    }

    let textQuestionComponents = <Typography>No questions added yet. Use the toolbar on the left to add some!</Typography>
    let rangeQuestionComponents = <></>
    let multipleQuestionComponents =<></>

    if(textQuestions.length > 0){ 
    textQuestionComponents = textQuestions.map((question)=>{
        return(
            <Grid item xs={12}>
            <Typography>{question.question}</Typography>
            <TextField style={{width: 400}} variant="filled" disabled label="Answer Field"></TextField>
            </Grid>
        )
    })}

    if(multipleQuestions.length > 0){ 
        multipleQuestionComponents = multipleQuestions.map((question)=>{
            let answers = question.answers.map((answer) => {
                return(
                    <FormControlLabel control={<Radio />} label={answer} />
                    
                )
            })
            return(
                <>
                <Grid item xs={12}>
                    <Typography>{question.question}</Typography>
                </Grid>
                <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        name="position"
                    >
                        {answers}
                    </RadioGroup>
                    </FormControl>
                </Grid>
                </>
            )
        })}

    if(rangeQuestions.length > 0){ 
        rangeQuestionComponents = rangeQuestions.map((question)=>{
            const marks = [
                {
                  value: question.min,
                  label: `${question.min}`,
                },
                {
                  value: question.max,
                  label: `${question.max}`,
                },
              ];
            return(
                <Grid item xs={12}>
                    <Typography>{question.question}</Typography>
                    <Slider  aria-label="Temperature"
                        style={{width: 400}}
                        min={question.min}
                        valueLabelDisplay="auto"
                        marks={marks}
                        max={question.max}></Slider>
                </Grid>
            )
        })}

    return(
        <>
        <Grid container spacing={10} style={{marginTop: 20}}>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Paper elevation={10} style={{width: "70vw", padding: 10, background: 'rgba(255, 255, 255, 0.90)', border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                          <Grid container alignItems='center' justifyContent='center' spacing={2}>
                               <Grid item>
                                <ConstructionIcon style={{marginTop: 12}}fontSize="large" ></ConstructionIcon>
                                </Grid>
                                <Grid item>
                                    <Typography  
                                    style={{ color: "black", fontWeight: 500, fontFamily: "Segoe UI"}} 
                                    variant='h3'>
                                        Survey Builder
                                    </Typography>
                                </Grid>
                           </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        <Grid item xs={6} sm={4} md={3} lg={3} xl={3} style={{marginTop: 20,  marginBottom: 50}}>
           <Paper elevation={10} style={{width: " 100%", marginLeft: '20px'}}>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    Add Question Fields
                                </ListItemText>
                            </ListItem>
                        
                            <Divider/>
            
                            <ListItem button onClick={handleTextOpen}>
                                <ListItemIcon>
                                    <TextFieldsIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    Open Answer
                                </ListItemText>
                            </ListItem>
                     
                            <ListItem button onClick={handleRangeOpen}>
                                <ListItemIcon >
                                    <NumbersIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Number Range
                                </ListItemText>
                            </ListItem>
                            <ListItem button onClick={handleMultipleOpen}>
                                <ListItemIcon>
                                    <AbcIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Multiple Choice
                                </ListItemText>
                            </ListItem>
                        </List>
                </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={8} xl={8} style={{marginTop: 30, marginBottom: 30}}>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Paper elevation={10}>
                            <Grid container spacing={2} style={{ marginLeft: '20px'}} justifyContent='center'>
                                    <Grid item xs={12} style={{marginBottom: 30}}>
                                        <TextField label="Survey Title" onChange={handleTitleChange}></TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3} justifyContent='center'>
                                            {textQuestionComponents}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3} justifyContent='center'>
                                            {rangeQuestionComponents}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3} justifyContent='center'>
                                            {multipleQuestionComponents}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom: 10}}>
                                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChange}/>} label="Private" />
                                        <Button onClick={handleCreateSurvey} variant="contained">Create Survey</Button>
                                    </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
     
        </Grid>
        <AddQuestionDialog 
            open={textOpen} 
            handleSubmit={handleSubmit} 
            handleClose={handleTextClose} 
            type={"text"}>
        </AddQuestionDialog>
        <AddQuestionDialog 
            open={rangeOpen} 
            handleSubmit={handleSubmit} 
            handleClose={handleRangeClose} 
            type={"range"}>
        </AddQuestionDialog>
        <AddQuestionDialog 
            open={multipleOpen}
            handleSubmit={handleSubmit}
            handleClose={handleMultipleClose} 
            type={"multiple"}>
        </AddQuestionDialog>
        </>
    )
}
export default SurveyCreator
