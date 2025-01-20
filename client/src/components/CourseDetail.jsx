import axios from "axios";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const CourseDetail = () => {

    const [course, setCourse] = useState([]);
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
                console.log('Error fetching Course id', error)

            }
        };
        if (id) {
            // if matches course id then deisplay the course fetched
            fetchCourse(); 
        } else {
            // if is not there then display user friendly message in console to showcase error
            console.log('Error fetching specific course', error);
        }

        
    }, [id]); // added the condition of id


        // "Update Course" link should navigate the user to the "/courses/:id/update" route & "return to list" navigates user back to home screen.
        //used ternary operator, if course has an author retrieve the first and last name of author if false (no author exist) return "author not found"
        //render the courses data an assigned it to each specific section to render to the "course detail" page.

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>
                        Update Course
                    </Link>
                    <Link className="button" href="#">
                        Delete Course
                    </Link>
                    <Link className="button button-secondary" to="/">
                        Return to List
                    </Link>
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
                            <p>
                                {course.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{course.materialsNeeded}</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>

    )
};

export default CourseDetail;