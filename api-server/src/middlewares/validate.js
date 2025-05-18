// This is the validator middleware for validating incoming requests in api-server application.

const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            errors: errors.array(),
        });
    }
    next();
};
