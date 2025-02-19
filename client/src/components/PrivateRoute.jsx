import { useContext } from "react";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
    
    //In the PrivateRoute component, access the authUser value from the UserContext using the useContext hook
    const { authUser } = useContext(UserContext);

    return (

    );
};

export default PrivateRoute; 