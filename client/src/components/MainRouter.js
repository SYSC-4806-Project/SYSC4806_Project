import React from 'react';
import { Routes, Route } from'react-router-dom';
import Home from './pages/Home';
import SurveyViewer from './pages/SurveyViewer';
import Survey from './pages/Survey';
import Profile from './pages/Profile';
import Response from './pages/Response';
import SurveyCreator from './SurveyCreator/surveyCreator'
import LoginPage from './pages/LoginPage'

const MainRouter = () => {
  return (
    <Routes>
      <Route path='/' exact element={<LoginPage/>}></Route>
      <Route path='/home' exact element={<Home/>}></Route>
      <Route path='/surveys' exact element={<SurveyViewer/>}></Route>
      <Route path='/surveys/:id' exact element={<Survey/>}></Route>
      <Route path='/addsurvey' exact element={<SurveyCreator />}></Route>
      <Route path='/responses/:id' exact element={<Response/>}></Route>
      <Route path='/profiles/:username' exact element={<Profile/>}></Route>
    </Routes>
  );
} 

export default MainRouter;