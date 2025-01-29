import { useContext, useRef, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

const UserSignUp = () => {
    //hooks
    const navigate = useNavigate();

    //state
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null); 
    const [error, setErrors] = useState([]); 

    //eventhandlers

    const handleSubmit = async (event) => {
        event.preventDefault();

        //created a user variable that contains the user's first and last name, email address, and password.

        const user = {
            firstName: firstName.current.value, 
            lastName: lastName.current.value, 
            emailAddress: emailAddress.current.value, 
            password: password.current.value
        }

        //created a try catch block to handle errors

        try {
            // make a post request to the server to create a new user
            const response = await axios.post("http://localhost:5000/api/users", user);
    
            //if servers response status of 201 then user was created, log user friendly message to console 
            // if server return response status of 400 then I stored the data in the Api will respond with the error 
            //to catch any other response that doesn't have a status code of 201 or 400

            if (response.status === 201) {
            console.log(`${user.firstName} is successfully signed up and authenticated!`);
            } else if (response.status === 400) {
            setErrors(error.response.data);
            } else {
                throw new Error(); 
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    };


    //navigate back to homepage when cancel button is clicked
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    };



    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    First Name
                </label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    ref={firstName}
                    placeholder="First Name" 
                />
                <label htmlFor="lastName">
                    Last Name
                </label>
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    ref={lastName}
                    placeholder="Last Name" 
                />
                <label htmlFor="emailAddress">
                    Email Address
                </label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"
                    ref={emailAddress} 
                    placeholder="Email Address" 
                />
                <label htmlFor="password">
                    Password
                </label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    ref={password}
                    placeholder="password" 
                />
                <button className="button" type="submit">
                    Sign Up
                </button>
                <button
                className="button button-secondary"
                onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
            <p>
                Already have a user account? Click here to{" "}
                <Link to="/signin">sign in</Link>!
            </p>
        </div>
    )
};

export default UserSignUp; 