const Joi = require('joi');

const registrationValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().alphanum(),
        fullname: Joi.string().required(),
        role: Joi.string().equal('admin', 'user', ''),
        admin_key: Joi.when('role', {
            is: 'admin',
            then: Joi.string().required()
        }),
        password: Joi.string().min(8).required()
    });

    const { error } = schema.validate(data);
    if (error) return error.message;
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().alphanum(),
        password: Joi.string().min(8).required()
    });    

    const { error } = schema.validate(data);
    if (error) return error.message;
};

module.exports = { registrationValidation, loginValidation };
