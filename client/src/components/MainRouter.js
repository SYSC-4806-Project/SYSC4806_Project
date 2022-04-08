import React from 'react';
import { Routes, Route } from'react-router-dom';
import Home from './pages/Home';
import SurveyViewer from './pages/SurveyViewer';
import Survey from './pages/Survey';
import Response from './pages/Response';
import About from './pages/About';
import Pricing from './pages/Pricing';
import SurveyCreator from './SurveyCreator/surveyCreator'
import SurveyConfirmation from './SurveyCreator/surveyConfirmation'

import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile';
import Background from './media/survey_background1.png'

const MainRouter = () => {
  return (
    
    <Routes>
      <Route path='/' exact element={<LoginPage/>}></Route>
      <Route path='/Home' exact element={<Home/>}></Route>
      <Route path='/surveyviewer' exact element={<SurveyViewer/>}></Route>
      <Route path='/pricing' exact element={<Pricing/>}></Route>
      <Route path='/about' exact element={<About/>}></Route>
      <Route path='/surveys/:id' exact element={<Survey/>}></Route>
      <Route path='/addsurvey' exact element={<SurveyCreator />}></Route>
      <Route path='/responses/:id' exact element={<Response/>}></Route>
      <Route path='/profiles/:username' exact element={<Profile/>}></Route>
      <Route path='/surveyconfirmation-created' exact element={<SurveyConfirmation type='created'/>}></Route>
      <Route path='/surveyconfirmation-completed' exact element={<SurveyConfirmation type='completed'/>}></Route>
    </Routes>

  );
} 

export default MainRouter;