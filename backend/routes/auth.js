const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const jwt_secret = "thisissecretkey"

// ROUTE-1 create a user using: POST "/api/auth/createuser". Doesn't require authentication
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    // check for the existing user
    try {
        let user = await User.findOne({ email: req.body.email })

        let salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(req.body.password, salt)

        if (user) {
            return res.status(400).json({ error: "email already in use" })
        } else {
            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const auth_token = jwt.sign(data, jwt_secret)

            user.save()
            return res.json({ auth_token })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error while creating user")
    };


})



// ROUTE-2 authenticate a user using: POST "/api/auth/login"
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {

    // if there are errors in validation return the bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ "error": "Invalid Credentials" })
        }

        const password_compare = await bcrypt.compare(password, user.password)
        if (!password_compare) {
            return res.status(400).json({ "error": "Invalid Credentials" })
        }

        // if user is authenticated
        const data = {
            user: {
                id: user.id
            }
        }

        const auth_token = jwt.sign(data, jwt_secret)
        return res.json({ auth_token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error while logging in")
    }


})

// ROUTE-3 get the logged-in user details using POST: "/api/auth/getuser". Login required
// fetchuser is a middleware to get the userid from the token
router.post('/getuser', fetchuser ,async (req, res) => {
    try {
        // in fetch we stored user data in req.user so we'll get user id as written
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error while getting user")
    }
})

module.exports = router