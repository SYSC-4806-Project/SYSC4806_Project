import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Pie , Bar} from "react-chartjs-2";
import 'chart.js/auto';

const Response = () => {
    const [isLoading, setLoading] = useState(true)
    const [surveys, setSurveys] = useState({})
    const { id } = useParams();

    const styles = {
        pieContainer: {
          width: "20%",
          height: "20%",
          display:'inline-block'
        }
    }

    useEffect(() => {
        axios.get("/responses").then(response => {
          setSurveys(response.data.response);
          setLoading(false);
        });
      }, []);

    if (isLoading) {
        return <div className="App"  style={{padding:80}}>Loading...</div>;
      }
    
    let surveyResponseArray = []
    for(let i = 0; i < surveys.length;i++){
        if(surveys[i].id==id){
            surveyResponseArray.push(surveys[i])
        }
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
              return <Typography variant='h5'>{answer}</Typography>
          })
          return (
            <div style={{padding:30}}>
          <Typography variant='h4'>{question}</Typography>
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
               <Typography variant='h4'>{rangeDataArr[0]}</Typography>
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
                <Typography variant='h4'>{mcDataArr[0]}</Typography>

                <div style={styles.pieContainer}>
                <Pie 
                    data={data}
                />
                </div>
            </div>
         )
      })

    return (
        <div style={{marginTop:80}}>
            {piecharts}
            {textAnswers}
            {histograms}
        </div>
    );
};

export default Response;