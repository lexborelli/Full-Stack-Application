import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

//imported components
import Header from './components/Header'; 
import PrivateRoute from './components/PrivateRoute';

//User components
import UserSignIn from './components/UserSignin';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

// Course components 
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

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
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />}/>
            <Route path="/courses/:id/update" element={<UpdateCourse />}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
