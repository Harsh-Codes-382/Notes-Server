// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
// import the express
const express = require('express');

const User = require('../models/User');

const router = express.Router();

const bcrypt = require('bcrypt');
// import the fethuser "MiddleWare" func from another file
var fetchuser = require('../Middleware/fetchUserdata');
// import the jsonwebtoken(JWT) 
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;   

// ROUTE 1:    create a user using: POST "/api/auth/createuser". Doesn't require authx
router.post('/createuser', [
    body('name', 'Name must be 3 char long').isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Password must be atleast 5 char').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    // If errors then send back the bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user of this id exist or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email id already existed" });
        }
        const salt = await bcrypt.genSalt(10);    // generate a salt of 10 length
        const secpass = await bcrypt.hash(req.body.password, salt);  // now mix the salt string with our input password & since it is returning the promise we use await
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,  // now we are passing the hashed password to store in our mongodb 
        });
        const data = {
            user: {
                id: user.id   
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET); 
        
        success = true;
        res.json({ success, jwtdata });
    } catch (error) {
        console.error("Your error is " + error);
        res.status(500).send('Internal server Error');
    }
})


// ROUTE 2:     Authentication a user using: POST "api/auth/login".NO LOGIN REQUIRED
router.post('/login', [
    body('email', 'Enter the valid email').isEmail(),  
    body('password', "Password can't be blanked").exists(),     
], 
    async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; 
    try {
        let user = await User.findOne({ email }); 

        if (!user) {    
            return res.status(404).json({ success, error: "Plaese try to login with correct account" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);  

        if (!passwordCompare) {
            return res.status(404).json({ success, error: "Plaese try to login with correct passowrd" });
        }
        const data = {  
            user: {
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET); 
        success = true;
        res.json({ success, jwtdata });
    } catch (error) {
        console.error("Your error is " + error);
        res.status(500).send('Internal server Error');
    }
})

    // ROUTE 3:     Get the details of logged in users using: POST "api/auth/getuser". LOGIN REQUIRED 

router.post('/getuser', fetchuser, async (req, res) => { 
                                                         
    try {
       const  userId = req.user.id; 

        const user = await User.findById(userId).select('-password');    
                                                                        
        res.send(user); 
    } catch (error) {
        console.error("Your error is " + error);
        res.status(500).send('Internal server Error');
    }
})
module.exports = router;