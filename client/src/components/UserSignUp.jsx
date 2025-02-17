import { useContext, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

//imported User context component
import UserContext from "../context/UserContext"; 

//imported errorsDisplay component 
import ErrorsDisplay from "../components/ErrorsDisplay";

const UserSignUp = () => {

    //at the top of the usersignup function, I'll get access to the signin function through the actions property
    const { actions } = useContext(UserContext); 
     
    //hooks
    const navigate = useNavigate();

    //state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setErrors] = useState([]); 

    //eventhandlers

    const handleSubmit = async (event) => {
        event.preventDefault();

        //created a user variable that contains the user's first and last name, email address, and password.

        const user = {
            firstName, 
            lastName, 
            emailAddress, 
            password
        };

        //created a try catch block to handle errors

        try {
            // make a post request to the server to create a new user
            const response = await axios.post("http://localhost:5000/api/users", user);
    
            //if servers response status of 201 then user was created, log user friendly message to console 
            // if server return response status of 400, then it will display an array of errors to user by rendering ErrorsDisplay component in return statment or display a user message "There was a problem with creating the new user." 
            //to catch any other response that doesn't have a status code of 201 or 400
            
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up and authenticated!`);
                const signedInUser = await actions.signInUser(emailAddress, password);
                
                //if the user is signed in then navigate the user to the home screen
                // if not then show a user friendly error message indicating there was a failure in signing the user up.
                
                if (signedInUser) {
                    navigate("/"); 
                } else {
                    setErrors(["Failure to sign in user. Please try again!"]);
                }
            }
        } catch (error) {
            if (error.response) {
               if (error.response.status === 400) {
                setErrors(error.response.data.errors || ['There was a problem with creating the new user.']);
            } else {
                setErrors(["Please try again, We did not recieve a response."]);
             }
            }
        };
    };


    //navigate back to homepage when cancel button is clicked
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    };



    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={error} />
                <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    First Name
                </label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <label htmlFor="lastName">
                    Last Name
                </label>
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name" 
                />
                <label htmlFor="emailAddress">
                    Email Address
                </label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"
                    value={emailAddress} 
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Email Address" 
                />
                <label htmlFor="password">
                    Password
                </label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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