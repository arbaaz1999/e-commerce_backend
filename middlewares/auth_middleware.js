const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
require('dotenv')

const user_auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token)
        if (token) {
            console.log('auth middleware if condition')
            token = token.split(' ')[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = user.id;
            next();
        } else {
            console.log('auth middleware else condition')
            return res.status(401).json({
                message: 'Token not found/ Unauthorized user!'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })

    }
}

const admin_auth = async (req, res, next) => {
    try {
        console.log(req.userId)
        const user = await User.findOne({ _id: req.userId })
        if (user.is_admin === true) {
            return next()
        } else {
            return res.status(401).json({
                message: "You are not authorized"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }
}


module.exports = { user_auth, admin_auth };