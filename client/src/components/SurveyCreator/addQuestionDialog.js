import React, {useEffect, useState} from 'react'

//material ui imports
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'

const AddQuestionDialog = (props) => {
    const {
        open,
        type,
        handleClose,
        handleSubmit} = props

    const [question, setQuestion] = useState("")
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [answer, setAnswer] = useState("")
    const [answers, setAnswers] = useState([])
    
    useEffect(()=>{}, [answers])

    function handleQuestionChange(event){
        setQuestion(event.target.value)
    }
    function handleMinChange(event){
        setMin(event.target.value)
    }
    function handleMaxChange(event){
        setMax(event.target.value)
    }
    function handleAnswerChange(event){
        setAnswer(event.target.value)
    }

    function handleAddAnswer(){
        if(answer.length === 0) {
            alert("answer should not be empty")
        } else {
            let tempAnswers = answers
            tempAnswers.push(answer)
            setAnswers(tempAnswers)
            setAnswer("")
        }

    }

    function handleAdd(){
        let questionObject = {}

        if(type === 'text'){
            if(question.length === 0) {
                alert("The question should not be empty")
            } else {
                questionObject = {question: question, type: 1}
                handleSubmit(type, questionObject)
                handlePreClose()
            }
        }

        else if(type === 'range'){
            console.log(Object.keys((min)).length)
            if(question.length === 0 || Object.keys((min)).length === 0 || Object.keys((max)).length === 0) {
                alert("All the textfield should not be empty")
            } else if(!new RegExp(/^[0-9]+$/).test(min) && new RegExp(/^[0-9]+$/).test(max)) {
                alert("The min and max should only contains digits")
            } else if((max - min) < 1) {
                alert("Max should larger than min")
            }
            else {
                questionObject = {question: question, min: min, max: max, type: 3}
                handleSubmit(type, questionObject)
                handlePreClose()
            }
        }
        else if(type === 'multiple'){
            if(question.length === 0 ) {
                alert("Question should not be empty")
            } else {
                questionObject= {question: question, answers: answers, type: 2}
                handleSubmit(type, questionObject)
                handlePreClose()
            }
        }

    }
    function handlePreClose(){
        setAnswers([])
        setAnswer("")
        handleClose()
    }
    let multipleAnswers = <></>
    if(answers.length > 0){ 
        multipleAnswers = answers.map((multipleAnswer)=>{
            return(
                <Grid container alignItems='center'>
                    <Grid item xs={6}>
                    <Radio></Radio>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >{multipleAnswer}</Typography>
                    </Grid>
                </Grid>
            )
    })}

    return<>
        {type === 'text' ?
        <Dialog syle={{margin: 10}} open={open} onClose={handlePreClose}>
        <Grid spacing={1} style={{padding: 10}} container direction='column' jusitfyContent='center' alignItems='center'>
            <Grid item>
                <Typography variant='h6'>Add Open Ended Question</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography>Question: </Typography>
                <TextField onChange={handleQuestionChange}/>
            </Grid>
            <Grid item>
                <Button onClick={handleAdd} variant='outlined'>Add</Button>
            </Grid>
        </Grid>
        </Dialog>: <></>
        } 
         {type === 'multiple' ?
        <Dialog open={open} onClose={handlePreClose}>
            <Grid spacing={1} style={{padding: 10}} container direction='column' jusitfyContent='center' alignItems='center'>
                <Grid item>
                    <Typography variant='h6'>Add Multiple Choice Question</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography>Question: </Typography>
                    <TextField onChange={handleQuestionChange}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography>Answer: </Typography>
                    <TextField value={answer} onChange={handleAnswerChange}/>
                    <Button onClick={handleAddAnswer} style={{marginTop: 10}}>Add Answer</Button>
                </Grid>
                <Grid item>
                    <Typography>Answers: </Typography>
                    {answers.length > 0 ? 
                       <>{multipleAnswers}</>: 
                      <Typography>None Added Yet</Typography>}
                </Grid>
                <Grid item>
                    <Button onClick={handleAdd} variant='outlined'>Add</Button>
                </Grid>
            </Grid>
        </Dialog>: <></>
        }     
        {type === 'range' ?
        <Dialog syle={{margin: 10}} open={open} onClose={handlePreClose}>
            <Grid spacing={1} style={{padding: 10}} container direction='column' jusitfyContent='center' alignItems='center'>
                <Grid item>
                    <Typography variant='h6'>Add Number Range Question</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2} alignItems='center' justifyContent='center'>
                        <Grid item>
                            <Typography>Question: </Typography>
                        </Grid>
                        <Grid item>
                            <TextField onChange={handleQuestionChange}/>
                        </Grid>
                        <Grid item >
                            <TextField style={{width: 100}} label="min" onChange={handleMinChange}/>
                        </Grid>
                        <Grid item >
                            <TextField style={{width: 100}} label="max" onChange={handleMaxChange}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={handleAdd} variant='outlined'>Add</Button>
                </Grid>
            </Grid>
        </Dialog>: <></>
        }      
    </>
}
export default AddQuestionDialog 