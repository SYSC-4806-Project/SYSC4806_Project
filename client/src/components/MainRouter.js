import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SurveyViewer from './pages/SurveyViewer';
import Survey from './pages/Survey';
import SurveyCreator from './SurveyCreator/surveyCreator'
import Signup from "./pages/account/Signup";

const MainRouter = () => {
  return (
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/surveys' exact element={<SurveyViewer/>}></Route>
      <Route path='/surveys/:id' exact element={<Survey/>}></Route>
      <Route path='/addsurvey' exact element={<SurveyCreator />}></Route>
      <Route path='/signup' exact element={<Signup />}></Route>
    </Routes>
  );
}

export default MainRouter;