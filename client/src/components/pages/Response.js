import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Pie , Bar} from "react-chartjs-2";
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import 'chart.js/auto';

const Response = () => {
    const [isLoading, setLoading] = useState(true)
    const [checkingActive, setCheckingActive] = useState(true)
    const [surveys, setSurveys] = useState({})
    const { id } = useParams();
    const [survey, setSurvey] = useState({})

    const styles = {
        pieContainer: {
          width: "65%",
          height: "65%",
          display:'inline-block'
        }
    }

    useEffect(() => {
        axios.get("/responses").then(response => {
          setSurveys(response.data.response);
          setLoading(false);
        });
      }, []);

      useEffect(() => {
        let config = {method: 'get', url: '/search/' + id + "-id"}
        let reply
        //call api amd save result to variable
        axios(config)
        .then(function (response) {
            console.log(response.data.status[0])
            setSurvey(response.data.status[0])
            setCheckingActive(false);
        })
        .catch(function (error) {
            console.log("error", error);
        });
        }, []);


    if (isLoading || checkingActive) {
        return <div className="App"  style={{padding:80}}>Loading...</div>;
      }
    
    let surveyResponseArray = []
    for(let i = 0; i < surveys.length;i++){
        if(surveys[i].id==id){
            surveyResponseArray.push(surveys[i])
        }
    }

   

            if(survey.active){
                return (
                    <Grid container direction='column' justifyContent='center' alignItems='center' style={{marginTop: 200}}>
                    <Paper elevation={10} style={{width: 400, padding: 20}}>
                        <Grid container spacing={4} direction='column'>
                            <Grid item>
                            <Typography>This survey is still active. Click the button below to fill it out or come back later to see the results!</Typography>
                            </Grid>
                            <Grid item>
                            <Grid container spacing={2} justifyContent='center'>
                                <Grid item>
                                <Button href={`/surveys/${survey.id}`} variant="contained">
                                        Fill out
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
        
    let questionMap = new Map();
    surveyResponseArray.map(survey=>{
        survey.questions.map((obj,i)=>{
            if(!questionMap.has(obj.question)){
                questionMap.set(obj.question,[[obj.type,obj.response]])
    
            }
            else{
                questionMap.get(obj.question).push([obj.type,obj.response])
            }           
        })      
    })

    let allMcData = []
    let allTextData = []
    let allRangeData = []

    for (const [key, value] of questionMap.entries()) {
        let mcData = new Map();
        let rangeData = new Map();
        let textData = []

        value.map(arr=>{
            if(arr[0]==1){
                textData.push(arr[1])
            }
            else if(arr[0]==2){                
                if(!mcData.has(arr[1])){
                    mcData.set(arr[1],1)
                }        
                else{
                    mcData.set(arr[1],mcData.get(arr[1])+1);
                }        
            }
            else if(arr[0]==3){
                if(!rangeData.has(arr[1])){
                    rangeData.set(arr[1],1)
                }        
                else{
                    rangeData.set(arr[1],rangeData.get(arr[1])+1);
                }  
            }
        })
        if(!mcData.size==0){
            allMcData.push([key,mcData])
        }
        if(!rangeData.size==0){
            allRangeData.push([key,rangeData])
        }
        if(!textData.length==0){
            allTextData.push([key,textData])
        }
      }

      let textAnswers = allTextData.map(textDataArr=>{
          let question = textDataArr[0]
          let answerArr = textDataArr[1]
          let answersComponent = answerArr.map(answer=>{
              return <Typography variant='h6'>{answer}</Typography>
          })
          return (
            <div style={{padding:30}}>
          <Typography style={{fontWeight: 800}}variant='h6'>{question}</Typography>
          {answersComponent}
          </div>
          )
      })

      var histogramR = Math.floor(Math.random() * 255);
      var histogramG = Math.floor(Math.random() * 255);
      var histogramB = Math.floor(Math.random() * 255);
      var histogramColor = "rgb(" + histogramR + "," + histogramG + "," + histogramB + ")";    

      let histograms = allRangeData.map(rangeDataArr=>{
          let sortedMap = new Map([...rangeDataArr[1]].sort(function(a, b) {
            return a[0] - b[0];
          }))
          let dataArr =  Array.from(sortedMap.values())
          let labelArr =  Array.from(sortedMap.keys())

          return(
            <div style={{padding:30}}>
               <Typography variant='h6'>{rangeDataArr[0]}</Typography>
               <div style={styles.pieContainer}>
               <Bar 
                   data={{
                    labels: labelArr,
                    datasets: [
                      {
                        borderColor: "blac",
                        lineTension: 0,
                        fill: false,
                        borderJoinStyle: "round",
                        data: dataArr,
                        borderWidth: 0.2,
                        barPercentage: 1,
                        categoryPercentage: 1,
                        backgroundColor: histogramColor,
                        hoverBackgroundColor: "green",
                        barThickness: "flex"
                      }
                    ]
                  }}
                  options={{
                      plugins:{
                      legend:{
                          display:false
                      }
                    }
                  }}
               />
               </div>
           </div>
        )
      })

      let piecharts = allMcData.map(mcDataArr=>{
        let dataArr = Array.from(mcDataArr[1].values())
        let labelArr = Array.from(mcDataArr[1].keys())
        var colorArr = [];

        var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };
         for(var i in labelArr){
            colorArr.push(dynamicColors())
         }
         
        const data = {
            labels:labelArr,
            datasets: [
                {
                    data:dataArr,
                    backgroundColor:colorArr
                }
            ]
        }
         return(
             <div style={{padding:30}}>
                <Typography variant='h6'>{mcDataArr[0]}</Typography>
                
                <div style={styles.pieContainer}>
                <Pie 
                    data={data}
                />
                </div>
            </div>
         )
      })

    return (
        <div style={{marginTop:80, marginBottom: 30}}>
            <Grid container spacing={5} justifyContent='center' alignItems='center'>
                <Grid item>
                    <Paper elevation={10}  style={{ height: 30,  background: 'rgba(255, 255, 255, 0.85)', width: 400, padding: 20, border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                            <Typography style={{fontWeight: 800}}variant='h6'>Survey Responses</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={5} justifyContent='center' alignItems='center'style={{marginTop: 20}}>
                
                <Grid item >
                   
                    <Paper elevation={10}  style={{ height: 300, overflowY: "scroll",  background: 'rgba(255, 255, 255, 0.85)', width: 400, padding: 20, border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                    <Typography style={{fontWeight: 800}}variant='h6'>Multiple Choice Answers</Typography>
                    {piecharts}
                    </Paper>
                </Grid>
                <Grid item >
                 
                    <Paper elevation={10} style={{ overflowY: "scroll", height: 300,  background: 'rgba(255, 255, 255, 0.85)', width: 400, padding: 20, border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                    <Typography style={{fontWeight: 800}}variant='h6'>Number Range Answers</Typography>
                    {histograms}
                    </Paper>
                </Grid>
                <Grid item >
                 
                    <Paper elevation={13} style={{ height: 300, overflow: "scroll", background: 'rgba(255, 255, 255, 0.85)', width: 400, padding: 20, border: 'solid', borderWidth: '4px', borderColor: "#1a237e"}}>
                    <Typography style={{fontWeight: 800}}variant='h6'>Text Answers</Typography>
                    {textAnswers}
                    </Paper>
                </Grid>
              
            </Grid>
        </div>
    );
};

export default Response;