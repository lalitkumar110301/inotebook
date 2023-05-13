var jwt = require('jsonwebtoken')
const jwt_secret = "thisissecretkey"

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to the req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ "error": "please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user

        // execute the next function after the fetchuser middleware
        next()
    } catch (error) {
        res.status(401).send({ "error": "jwt.verify failed" })
    }

}

module.exports = fetchuser;