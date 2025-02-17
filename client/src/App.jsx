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
import UpdateCourse from './components/UpdateCourse';
import ErrorsDisplay from './components/ErrorsDisplay';

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
          <Route path="/courses/create" element={<CreateCourse />}/>
          <Route path="/courses/:id/update" element={<UpdateCourse />}/>
      </Routes>
    </>
  );
}

export default App;
