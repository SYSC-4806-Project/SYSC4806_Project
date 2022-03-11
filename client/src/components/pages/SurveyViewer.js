import React, {useState, Component} from 'react';
import TextSurvey from "./TextSurvey";
import axios from 'axios';
import Button from "@mui/material/Button";

const SurveyViewer = () => {

    // const data = axios.get('/surveys/');
    const [ques, setQues] = useState([]);
    const [type, setType] = useState(0);

    const a = () => {
        getData()

    }

    const getData = async () => {
        try {
            await axios.get(`/surveys/`).then(q => {
                // console.log(q.data)
                retrieveData(q)
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const retrieveData = file => {
        let response = file.data.response
        response.map(arr => {
            // console.log(arr)
            let q = arr.questions
            q.map(ob => {
                // console.log(ob)
                setQues(ob.question)
                setType(ob.type)
                console.log(type)
                return (
                    <TextSurvey question={ob.question}></TextSurvey>
                )
                // if(type === 1) {
                //     return (
                //         <TextSurvey question={content.question}></TextSurvey>
                //     );
                // }
                // console.log(question)
            });
        });
    }

    return (
        <div className="survey">

            <h2>Tentative placeholder for survey page</h2>
            <Button onClick={a}> button</Button>
            <h2>{ques}</h2>
        </div>
    );
};

export default SurveyViewer;