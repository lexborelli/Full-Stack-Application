'use strict'; 

const express = require('express');
const router = express.Router(); 
const { User, Course } = require('./models');

//middleware
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');


//api/users - GET: This will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    
    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body); 
        res.status(201).location('/').end();
    } catch (error){
        console.log('ERROR: ' , error.name); 
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err=> err.message); 
            res.status(400).json({ errors });
        } else {
            throw error; 
        }
    }
}));

router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include : [
            {
                model: User,
                as: 'user',

            }
        ]
    });
    res.status(200).json(courses);
}));

router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include : [
            {
                model: User,
                as: 'user',
            }
        ]
    }); 
    res.status(200).json(course); 
    
}));

router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        await Course.create(req.body); 
        res.status(201).location('/').end();
    } catch (error){
        console.log('ERROR: ' , error.name); 
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err=> err.message); 
            res.status(400).json({ errors });
        } else {
            throw error; 
        }
    }
}));

router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
    if (course.userId === req.currentUser.id) {
     
        await course.update(req.body); 
        res.status(204).end(); 
        } else {
            res.status(403).json({message: "You are not an authorized user"});
        }
    } else {
        res.status(404).json({message: "Course not found"});
    }
    } catch (error) {
        console.log('ERROR: ' , error.name); 
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err=> err.message); 
            res.status(400).json({ errors });
        } else {
            throw error; 
        }
    }
}));
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
    if (course.userId === req.currentUser.id) {
     
        await course.destroy(); 
        res.status(204).end(); 
        } else {
            res.status(403).json({message: "You are not an authorized user"});
        }
    } else {
        res.status(404).json({message: "Course not found"});
    }
    } catch (error) {
        console.log('ERROR: ' , error.name); 
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err=> err.message); 
            res.status(400).json({ errors });
        } else {
            throw error; 
        }
    }
}));



module.exports = router; 