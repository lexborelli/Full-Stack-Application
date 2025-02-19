import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

const CreateCourse = () => {

    const { authUser } = useContext(UserContext);
    

    //hooks
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            console.log("Please sign in. You are not authenticated");
            navigate("/signin");
            return; 
        } 
    }, [authUser, navigate]);

    //state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [estimatedTime, setEstimatedTime] = useState(''); 
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [error, setError] = useState([]);
    


    const handleSubmit = async(event) => {
        event.preventDefault();

        //created a variable that contains the userid, course title, description, estimated time, and materials needed
        const course = {
            userId: authUser.id,
            title,
            description,
            estimatedTime,
            materialsNeeded 
        };

        ///in the try...catch block first creates variable called response that awaits for axios to create a new course.
        //if the response status is 201 which means the course was created and the server didn't return any data "no content", then the console will display user friendly message that a new course was created and navigate user back to root route 
        //else console log will inform user there was a failure to create the new course.
        //the catch block will check if the error response is equal to a 400 status code, then it will display an array of errors to user by rendering ErrorsDisplay component in return statment or display a user message "There was a problem with creating the new course." 
        //else the catch block will display a message to the user that an unexpected error has occurred. 

        try {
            const response = await axios.post('http://localhost:5000/api/courses', course, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Basic ${authUser.authToken}`,

                },
            });
            if (response.status === 201) {
                console.log(`${course.title} has been successfully created`);
               navigate('/');
            } else {
                console.log("Failure to create course. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.errors || ['There was a problem creating the course.']);
                } else {
                    setError("An unexpected error has occurred. Please try again.");
                }
             } 
            }
        
    };

    // cancel button event handler , navigate user back to root route
    const handleCancel = (event) => {
        event.preventDefault(); 
        navigate("/");
    };

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <ErrorsDisplay errors={error} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                        id="courseTitle"
                        name="courseTitle"
                        value={title}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <p> {authUser.firstName} {authUser.lastName} </p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                        id="courseDescription"
                        name="courseDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                        id="estimatedTime"
                        name="estimatedTime"
                        value= {estimatedTime}
                        type="text"
                        onChange={(e) => setEstimatedTime(e.target.value)}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        value={materialsNeeded}
                        onChange={(e) => setMaterialsNeeded(e.target.value)}
                        />
                    </div>
                </div>
                <button className="button" type="submit">
                    Create Course
                </button>
                <button
                    className="button button-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;