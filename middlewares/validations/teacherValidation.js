const { body, query, param } = require('express-validator');

exports.patchValidation = [
    body("id").isMongoId().withMessage("id should be ObjectID"),

    body("fullName").optional().isString().withMessage("name should be string"),

    body("password").optional().isStrongPassword().withMessage("password is not strong"),

    body("email").optional().isEmail().withMessage("email is not vaild"),

    body("image").optional().isString().withMessage("image should be string"),
];

exports.deleteValidation = [body("id").isMongoId().withMessage("Invalid id")];

