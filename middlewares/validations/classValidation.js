const { body, query, param } = require('express-validator');

exports.postValidation = [
    // body("id").isInt().withMessage("id should be integer"),

    body("name").optional().isString().withMessage("name should be string"),

    body("supervisor").isMongoId().withMessage("supervisor id should be mongo id"),

    // body("childern").isArray().withMessage("childern should be array of child ids")
    //     .custom((childern) => {
    //         if (childern.some((id) => isNaN(id)))
    //             throw new Error('childern should contain only integers');
    //         return true;
    //     })
];

exports.patchValidation = [
    body("id").isInt().withMessage("Id should be integer"),

    body("name").optional().isString().withMessage("name should be string"),

    body("supervisor").optional().isMongoId().withMessage("supervisor id should be mongo id"),

    // body("childern").optional().isArray({ min: 1 }).withMessage("childern should be array of integers")
    //     .custom((childern) => {
    //         if (childern.some((id) => isNaN(id)))
    //             throw new Error('childern should contain only integers');
    //         return true;
    //     })
];

exports.deleteValidation = [body("id").isInt().withMessage("Invalid id")];

