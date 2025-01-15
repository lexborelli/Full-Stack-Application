'use strict'; 

//added a call to node.js require method to import basic-auth module
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


exports.authenticateUser = async (req, res, next) => {
    let message; // store the message to display
    
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
  // If the user's credentials are available...
     // Attempt to retrieve the user from the data store
     // by their username (i.e. the user's "key"
     // from the Authorization header).
    if (credentials) {
        const user = await User.findOne({ where: {emailAddress: credentials.name} });
     
        // If a user was successfully retrieved from the data store...
     // Use the bcrypt npm package to compare the user's password
     // (from the Authorization header) to the user's password
     // that was retrieved from the data store.
       
        if (user) {
            const authenticated = bcrypt
            .compareSync(credentials.pass, user.password);
     // so any middleware functions that follow this middleware function
     // will have access to the user's information.
         if (authenticated) { // If the passwords match...
            console.log(`Authentication successful for Email Address: ${user.emailAddress} `);
                //Store the retrieved user object on the request object
            req.currentUser = user; 

            } else {
                message = `Authentication faliure for Email Address : ${user.emailAddress} `; 
            } 
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = `Auth header not found`; 
    }
    //we log the message to the console (for debugging purposes) and return a 401 Unauthorized HTTP status code and a generic "Access Denied" message in the response body
    if (message) {
        console.warn(message); 
        res.status(401).json({ message: 'Access Denied' });
    } else {
    // Or if user authentication succeeded...
     // Call the next() method.
        next(); 
    }
};