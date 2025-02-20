import axios from "axios";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

//imported react-markdown to render markdown text. To change the text from being display as a string and formatting the text correctly to showcase a paragraph and list 
import ReactMarkdown from 'react-markdown'; 

const CourseDetail = () => {

    const [course, setCourse] = useState([]);
    const [error, setError] = useState([]);
    const { id } = useParams();

    const { authUser } = useContext(UserContext);

    const navigate = useNavigate(); 

    //used useEffect() to fetch data with the help of axios which was imported to fetch courses data from api folder, gave axios access to course id endpoint to showcase specific courses

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                //handle succes
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                // catch error
                console.log('Error fetching Course id', error)

            }
        };
        if (id) {
            // if matches course id then display the course fetched
            fetchCourse(); 
        } else {
            // if is not there then display user friendly message in console to showcase error
            console.log('Error fetching specific course', error);
        }

        
    }, [id]); // added the condition of id


    //handledelete function sends a delete request to rest API's /api/cpurses/:id endpoint to delete the specific course the user selected.
    // if the response status returns a 204 "No Content", meaning that the server successfully processed the clients request to delete the course the user selected.
    // the the user will be redirected to the root route.
    //else, if the course was not deleted the console.log message will indicate that there was a problem
    // catch block will check if there was an error response status of 403 and display a message to the user that they are an unauthorized user. They will not be able to update the course.
    // else if the error response status is a 404, then it will display an array of errors to user by rendering ErrorsDisplay component in return statment or display a user message "The page that you requested, does not exist".
    //else the catch block will display a message to the user that an unexpected error has occurred. 

    const handleDelete = async (event) => {
        event.preventDefault(); 

        try {
            const response = await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Basic ${authUser.authToken}`,

                },
            });
            if (response.status === 204) {
                console.log (`You have successfully deleted the ${course.title} course`);
                navigate('/');
            } else {
                console.log('There was a problem deleting the course. Please try again!');
            }
            
        } catch (error) {
            if (error.response){
                if (error.response.status === 403) {
                    setError(['You are not an authorized user']);
                } else if (error.response.status === 404) {
                    setError(error.response.data.errors || ['The page that you requested, does not exist.']);
                } else {
                    setError(['Sorry! An unexpected error has occurred.']);
                }
            }
        }


    };

        // "Update Course" link should navigate the user to the "/courses/:id/update" route & "return to list" navigates user back to home screen.
        //used ternary operator, if course has an author retrieve the first and last name of author if false (no author exist) return "author not found"
        //render the courses data an assigned it to each specific section to render to the "course detail" page.
        // Used the React Markdown package to render the description and materialsNeeded properties as Markdown.
        // used ternary operator, if the userId of the authUser matches the userId of the course, render the "Update Course" and "Delete Course" buttons, otherwise the "update course" "delete course" will be hidden from the user
        return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser && course.userId === authUser.id ? (
                        <>
                            <Link className="button" to={`/courses/${id}/update`}>
                                Update Course
                            </Link>
                            <Link className="button" onClick={handleDelete}>
                                Delete Course
                            </Link>
                            <Link className="button button-secondary" to="/">
                                Return to List
                            </Link>
                        </>
                        
                    ) : (
                        <Link className="button button-secondary" to="/">
                            Return to List
                        </Link>
                    )}  
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p> By 
                                {course.user
                                ? `${course.user.firstName} ${course.user.lastName}`
                                : "Author Not Found"
                                }
                            </p>
                            <ReactMarkdown>
                                {course.description}
                            </ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
                                
    )
};

export default CourseDetail;