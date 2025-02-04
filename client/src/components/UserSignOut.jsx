import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom"; 
import UserContext from "../context/UserContext";

const UserSignOut = () => {
    //read usercontext
    const { actions } = useContext(UserContext);

    //useEffect takes in function to run once the component is rendered, i'll call actions.signout
    useEffect(() => actions.signOutUser());

    //navigate user to the root route and replace the sign out route in the history stack with the root route
    //the replace prevents a navigation loop when user tries to navigate back by clicking "back" button

    return (
        <Navigate to="/" replace />
    );
};

export default UserSignOut; 