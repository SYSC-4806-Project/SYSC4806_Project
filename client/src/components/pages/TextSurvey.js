import React, { Component } from "react"

const TextSurvey = props => {

        return (
            <div className='survey'>
                <h4>{props.question}</h4>
                {/*<h2>{props.response}</h2>*/}
            </div>
        );

}



export default TextSurvey;

