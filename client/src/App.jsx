import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

//imported components
import Header from './components/Header'; 
import Courses from './components/Courses';

function App() {
  

  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<Courses />}/>
      </Routes>
    </Router>
   
  )
}

export default App
