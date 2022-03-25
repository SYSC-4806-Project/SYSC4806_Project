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

const SurveyCreator = () => {
    const [textOpen, setTextOpen] = useState(false)
    const [rangeOpen, setRangeOpen] = useState(false)
    const [multipleOpen, setMultipleOpen] = useState(false)
    const [textQuestions, setTextQuestions] = useState([]) 
    const [rangeQuestions, setRangeQuestions] = useState([])
    const [multipleQuestions, setMultipleQuestions] = useState([])

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

    async function handleCreateSurvey(){
        let questionsArr = []
        textQuestions.forEach(element => questionsArr.push(element))
        rangeQuestions.forEach(element => questionsArr.push(element))
        multipleQuestions.forEach(element => questionsArr.push(element))

        let idNum = Math.floor(Math.random() * 9000)

        let surveyObject = {id: idNum, questions: questionsArr}

        await axios.post("/addSurvey", surveyObject)
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
        <div>
        <Grid container>
            <Grid item xs={2}>
                <Drawer variant="permanent" style={{overflow: 'auto'}}>
                    <List style={{marginTop: 100}}>
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
                </Drawer>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 100}}>
                <Grid container spacing={2} justifyContent='center'>
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
                        <Button onClick={handleCreateSurvey} variant="contained">Create Survey</Button>
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
    </div>
    )
}
export default SurveyCreator
