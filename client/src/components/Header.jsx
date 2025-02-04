
//import UserContext
import UserContext from '../context/UserContext';

//imported useContext 
import { useContext } from 'react';

import { Link } from 'react-router-dom';

//seperated Nav from header for more readable code
// used a function that returns nav UI inside the consumer

const Nav = () => {
    //declared a variable named contect and set it equal to the useContext hook, provided useContext, the context to subscribe to, which is UserContext.
    //destructured context since it is an object with { user }
    const { authUser } = useContext(UserContext);
    
    return (
            <nav>
                {authUser === null ? (
                        <ul className="header--signedout">
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header--signedin">
                            <span>
                                Welcome, {authUser.firstName}
                            </span>
                            <li>
                                <Link to="/signout">Sign Out</Link>
                            </li>
                        </ul>
                    )
                }
            </nav> 
    )
}; 

const Header = () => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to="/">Courses</Link>
                </h1>
                <Nav />
            </div>
        </header>
    ); 
}; 

export default Header; 