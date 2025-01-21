import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { useState } from 'react';

//imported components
import Header from './components/Header'; 
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

//import Context
import UserContext from './context/UserContext';

function App() {

  const [user, setUser] = useState(null); 

  return (
    <UserContext.Provider value={{user}}> 
      <Router>
        <Header />
        <Routes> 
          <Route path="/" element={<Courses />}/>
          <Route path="/courses/:id" element={<CourseDetail />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
