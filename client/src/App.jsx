import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

//imported components
import Header from './components/Header'; 
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignin';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';

function App() {

  return (
    <>
      <Header />
      <Routes> 
          <Route path="/" element={<Courses />}/>
          <Route path="/courses/:id" element={<CourseDetail />}/>
          <Route path="/signin" element={<UserSignIn />}/>
          <Route path="/signup" element={<UserSignUp />}/>
          <Route path="/signout" element={<UserSignOut />}/>
          <Route path="/createcourse" element={<CreateCourse />}/>
      </Routes>
    </>
  );
}

export default App;
