import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext"; 
import ErrorsDisplay from "./ErrorsDisplay";

const UpdateCourse = () => {

    const { authUser } = useContext(UserContext);

    //navigation hook
    const navigate = useNavigate(); 

    // course holds state value with 4 properties 
    const [course, setCourse] = useState({
        title: "",
        description: "", 
        estimatedTime: "", 
        materialsNeeded: "", 
    });
    
    const [error, setError] = useState([]); 
    //course id
    const { id } = useParams();

    //used useEffect() to fetch data with the help of axios which was imported to fetch courses data from api folder, gave axios access to course id endpoint to showcase specific courses
    useEffect(() => {

    //used fetch data with the help of axios which was imported to fetch courses data from api folder, gave axios access to course id endpoint to showcase specific courses

        const fetchCourse = async () => {
            try {
                //handle succes
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                // catch error
                console.error('Error fetching Course id', error)

            }
        };
        if (id) {
            // if matches course id then display the course fetched
            fetchCourse(); 
        } else {
            // if is not there then display user friendly message in console to showcase error
            console.log('Error fetching specific course');
        }

        
    }, [id]); // added the condition of id
            
    //created a function called handleChange that will update the course state while leeping all existing values 
    //extracting name and value from the event object, this is triggered when the user types in the input field
    //the name attribute of the input field will change with the current value the user enters
    //passing callback to setCourse to update the most recent state
    //used spread operator with previousCourse to individualize each element to help create a new copy with the updated values the user types 

    const handleChange = (event) => {
        
        const { name, value } = event.target; 
        
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));

    };
    
         
    //sending a put request to rest API's /api/cpurses/:id endpoint with the updated courses's title, description, estimated time, and materials needed for when the form is being submitted
    // if the response status returns a 204 "No Content", meaning that the server successfully processed the clients request to change the course's title, description, materialsNeeded, and estimatedTime inputed by the user
    // the the user will be redirected to the specific course page that they changed to see that it was successfully changed, a console log message will display that the course was successfully changed
    //else, if the course was not updated or successfully changed then a console.log message will indicate that there was a problem
    // catch block will check if there was an error response status of 403 and display a message to the user that they are an unauthorized user. They will not be able to update the course.
    // else if the error response status is a 400, then it will display an array of errors to user by rendering ErrorsDisplay component in return statment or display a user message "There was a problem with updating the course." 
    //else the catch block will display a message to the user that an unexpected error has occurred. 

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, 
                {
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded,
                    userId: authUser.id
                }, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Basic ${authUser.authToken}`,

                },
            }); 
            if (response.status === 204) {
                console.log (`You have successfully updated the ${course.title} course`);
                navigate(`/courses/${id}`);
            } else {
                console.log('There was a problem with updating the course. Please try again!');
            }
            
        } catch (error) {
            if (error.response){
                if (error.response.status === 403) {
                    setError(['You are not an authorized user']);
                } else if (error.response.status === 400) {
                    setError(error.response.data.errors || ['There was a problem with updating the course.']);
                } else {
                    setError(['Sorry! An unexpected error has occurred.']);
                }
            }
            
        };
        

    }; 

    // cancel button event handler , navigates user back to root route
    const handleCancel = (event) => {
        event.preventDefault(); 
        navigate("/");
    };

    return ( 
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay errors={error} />
            <form onSubmit={handleSubmit}> 
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="title"
                            type="text"
                            value={course.title}
                            onChange={handleChange}
                         />
                        <p>By Joe Smith</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                        id="courseDescription"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={course.estimatedTime}
                            onChange={handleChange}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={course.materialsNeeded} 
                            onChange={handleChange}
                        
                        />
                    </div>
                    </div>
                    <button className="button" type="submit">
                        Update Course
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

export default UpdateCourse; 