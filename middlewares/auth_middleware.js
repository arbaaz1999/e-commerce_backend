const jwt = require('jsonwebtoken');

const protected = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token)
        if (token) {
            console.log('auth middleware if condition')
            token = token.split(' ')[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = user.id;
        } else {
            console.log('auth middleware else condition')
            return res.status(401).json({
                message: 'Token not found/ Unauthorized user!'
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })

    }
}

module.exports = protected;