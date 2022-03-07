import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SurveyViewer from './pages/SurveyViewer';

const MainRouter = () => {
  return (
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/surveys' exact element={<SurveyViewer/>}></Route>
    </Routes>
  );
}

export default MainRouter;