// importing create context from react 
import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

//declare varible named user context and set it equal to createcontext with default value set to null

 const UserContext = createContext(null); 

// created Provider component as a function named UserProvider 

export const UserProvider = ({ children }) => {
    
    //retrieve the value of the cookie using cookies.get, which takes a cookie's name as a parameter
    // set authUser initial state based on the existence of an authenticatedUser cookie.
    // in authUser state declaration, i'll update the initial value to equal the cookie's value if the authenticatedUser cookie exists, or null if the cookie doesn't exist. 
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
      

    //signinUser 
    const signInUser = async (emailAddress, password) => {
        
        //created try catch block to deal with errors
        //encode emailAddress and password the user enters with btoa method
        //fetchOptions gets the user's info in an api call to users, it'll create a encoded credentials object that will hold the encoded credentials in an Authorization header
        //called fetchOptions and stored it in a variable called response that awaits axios fetching fetchOptions

        try { 
            const encodedCredentials = btoa(`${emailAddress}:${password}`);

            const fetchOptions = {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    "Content-Type": "application/json; charset=utf-8",
                    
                },
            };
            const response = await axios.get("http://localhost:5000/api/users", fetchOptions);
            //logged in response to the console
            console.log("Response data:", response.data);
            console.log("Response status:", response.status); 
            
            //if server responds to axios fetch call with a a status of 200 then we know the user was authenticated and the response contains the user's data, well store the user's info in a variable called user
            // set the AuthUser state equal to the user's data, returned user 
            // else if the server response with a status code of 401 that means the user was not authenticated
            // created a cookie to store the authenticated user, set authenticatedUser as cookie's name, specified the string value to store in the cookie in as the second argument,set expiration as value one so that it expires in one day from now as last argument    

            if (response.status === 200) {
                const user = response.data; 
                user.authToken = encodedCredentials;
                setAuthUser(user); 
                Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
                return user;
            } else if (response.status === 401) {
                console.log("User is not authorized. Invalid credentials.");
                return null; 
            }
        } catch (error) {
            console.error("Sign in failed", error.response.data || error.message);
        }
        
        
    };

    const signOutUser = () => {
        setAuthUser(null); 
    };
    



    //Provided the signInUser function and authUser state to the UserContext
    //passed UserContext.Provider the value prop so the SignInUser data provided will be accessible to any component in the app
    

    return (
        <UserContext.Provider 
            value ={{
                authUser,
                actions: {
                    signInUser, 
                    signOutUser
                },
            }}
        > 
        {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;