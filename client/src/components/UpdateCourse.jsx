import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {

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

    const handleChange = (e) => {
        
        const { name, value } = e.target; 
        
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));

    };
    
                                                                                                                                                                                                                                             
    const handleSubmit = async (event) => {
        event.preventDefault();


    }; 

    // cancel button event handler , navigate user back to root route
    const handleCancel = (event) => {
        event.preventDefault(); 
        navigate("/");
    };

    return ( 
        <div className="wrap">
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={course.title}
                            onChange={handleChange}
                         />
                        <p>By Joe Smith</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                        id="courseDescription"
                        name="courseDescription"
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