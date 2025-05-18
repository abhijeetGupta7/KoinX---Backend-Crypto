// This is the validator middleware for validating incoming requests in api-server application.

const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "fail",
            errors: errors.array(),
        });
    }
    next();
};
