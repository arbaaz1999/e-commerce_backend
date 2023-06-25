const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
require('dotenv').config();

const user_auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: 'You are not authorized',
                    error: error.message,
                })
            }

            if (decoded) {
                console.log(decoded)
                req.user = decoded.id;
                next();
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong!',
            error: error.message,
        })

    }
}

const admin_auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (decoded) {
                if (decoded.is_admin === true) {
                    return next()
                } else {
                    return res.status(401).json({
                        message: 'You are not authorized',
                    })
                }
            } else if (error) {
                return res.status(401).json({
                    message: 'You are not authorized',
                    error: error.message,
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Some Internal server error occured',
            error: error.message,
        })

    }
}


module.exports = { user_auth, admin_auth };