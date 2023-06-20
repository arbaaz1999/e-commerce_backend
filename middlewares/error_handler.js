const constants = require('../constants');
const { VALIDATION_ERROR, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, SERVER_ERROR } = constants;
const error_handler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case VALIDATION_ERROR:
            req.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case UNAUTHORIZED:
            req.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case FORBIDDEN:
            req.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case NOT_FOUND:
            req.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case SERVER_ERROR:
            req.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        default:
            console.log("No error, all good!")
            break;
    }
}

module.exports = error_handler;