const { body, query, param } = require('express-validator');

exports.postValidation = [
    body("fullname").isString().withMessage("name should be string")
        .trim().notEmpty().withMessage("name is empty"),

    body("address").isObject().withMessage("address should be an object"),

    body("address.city").exists().withMessage("address object should have a city")
        .isString().withMessage("city should be string")
        .trim().notEmpty().withMessage("city is empty"),

    body("address.street").optional().exists().withMessage("address object should have a street")
        .isString().withMessage("street should be string")
        .trim().notEmpty().withMessage("street is empty"),

    body("address.building").optional().exists().withMessage("address object should have a building")
        .isString().withMessage("building should be string")
        .trim().notEmpty().withMessage("building is empty"),
];

exports.patchValidation = [
    body("id").isInt().withMessage("Id should be integer"),

    body("fullName").optional().isString().withMessage("Name should be string")
        .trim().notEmpty().withMessage("Name is empty"),

    body("age").optional().isInt().withMessage("Age should be integer")
        .custom((value) => value <= 7 && value >= 1).withMessage("Child age should be betwwen [1,7]"),

    body("level").optional().isIn(['PreKG', 'KG1', 'KG2']).withMessage("Child level should be among these values [PreKG,KG1,KG2]"),

    body("address").optional().isObject().withMessage("address should be an object"),

    body("address.city").optional().exists().withMessage("address object should have a city")
        .isString().withMessage("city should be string")
        .trim().notEmpty().withMessage("city is empty"),

    body("address.street").optional().exists().withMessage("address object should have a street")
        .isString().withMessage("street should be string")
        .trim().notEmpty().withMessage("street is empty"),

    body("address.building").optional().exists().withMessage("address object should have a building")
        .isString().withMessage("building should be string")
        .trim().notEmpty().withMessage("building is empty"),
];

exports.deleteValidation = [body("id").isInt().withMessage("Invalid id")];

