import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

//imported components
import Header from './components/Header'; 
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {


  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<Courses />}/>
        <Route path="/courses/:id" element={<CourseDetail />}/>
      </Routes>
    </Router>
   
  )
}

export default App;
