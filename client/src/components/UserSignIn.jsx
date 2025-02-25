import { useState, useContext } from "react";
import UserContext from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

//imported errorsDisplay component 
import ErrorsDisplay from "./ErrorsDisplay.jsx";

const UserSignIn = () => {
    //userContext
    const { actions } = useContext(UserContext);
    
    //hooks
    const navigate = useNavigate();


    // State
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    

    //event handlers

    // In handleSubmit event handler, created fetchOptions object, the fetch reques will get the user's info. the server will request the user's email address and pasword
    // The client passes the authentication information to the server in an authorization header using Base 64 encoding. btoa method creates a base 64 encoded string from a string data.
    // created a credentials object that holds email address and pasword. stored encoded credentials in encodedCredentials variable.
    //passed btoa a template literal that interpolates the email Address and password.

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        
        //created try catch block to deal with errors
        //signed in the user with signInUser function, passing it the emailAddress and password of user
        // signInUser function returns the user's information, if authenticated, or null if the user wasn't authenticated. Stored this information in a variable called user
        //if user variable exists, the user will be navigated to authenticated 
        // else inform user the sign in was unsuccessful

        try {
            const user = await actions.signInUser(emailAddress, password);
            if(user) {
                console.log("Success! User is signed in!", user);
                navigate("/");
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch(error) {
            console.log(error);
        }
    };

    //handle cancel event handler, will navigate user to root route when they click the cancel button

    const handleCancel = (event) => {
        event.preventDefault(); 
        navigate("/"); 
    };

    //passed ErrorsDisplay component with the prop errors and pass it the errors state

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <ErrorsDisplay errors={errors}  />
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={emailAddress}
                    placeholder="Email Address"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    />
                <label htmlFor="password">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="button" type="submit">
                    Sign In
                </button>
                <button
                className="button button-secondary"
                onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
            <p>
                Do you not have a user account? Click here to <Link to="/signup">sign up</Link>!
             </p>
        </div>
    )
};

export default UserSignIn; 