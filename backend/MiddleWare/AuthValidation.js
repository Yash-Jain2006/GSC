const Joi = require('joi');

const SignupValid = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message
        });
    }
    next();
}

const LoginValid = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message
        });
    }
    next();
}

module.exports = {
    SignupValid,
    LoginValid
}