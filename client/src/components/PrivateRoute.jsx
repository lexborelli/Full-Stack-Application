import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
    
    //In the PrivateRoute component, access the authUser value from the UserContext using the useContext hook
    const { authUser } = useContext(UserContext);

    // Used if / else statement to check if the authUser is a truthy value
    //if the user hasn't signed in or authUser is a falsey value, then i'll navigate the user to the sign in route.
    //else, i'll use react router's outlet tag to allow the app to render the PivateRoute.
    
    if (!authUser) {
        return <Navigate to="/signin" replace />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute; 