import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
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
    const [errors, SetErrors] = useState([]);
    


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
            } else if (response.status === 400) {
                const error = await response.json();
                SetErrors(error.errors || ["Validation errors."]);
            } else {
                console.log("Failure to create course. Please try again.");
            }
        } catch (error) {
            console.log("An unexpected error has occurred. Please try again.");
            console.error( "error:", error);
            SetErrors(error.response.data);
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
            <ErrorsDisplay errors={errors} />
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