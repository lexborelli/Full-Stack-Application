
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
                                <a href="sign-up.html">Sign Up</a>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header--signedin">
                            <li>
                                Welcome, {authUser.firstName}
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
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
                    <Link href="/">Courses</Link>
                </h1>
                <Nav />
            </div>
        </header>
    ); 
}; 

export default Header; 