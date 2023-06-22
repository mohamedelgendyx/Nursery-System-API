const express = require('express');

const controller = require('../controllers/childController');
const validator = require('../middlewares/validations/validationMW');
const childValidation = require("../middlewares/validations/childValidation");
const { isAdmin, isAdminOrSupervisor } = require("../middlewares/authentcationMW");

const router = express.Router();

router.route('/child')
    .all(isAdmin)
    .get(controller.getAllChilds)
    .post(
        childValidation.postValidation,
        validator,
        controller.addNewChild
    )
    .patch(
        childValidation.patchValidation,
        validator,
        controller.updateChild
    )
    .delete(
        childValidation.deleteValidation,
        validator,
        controller.deleteChild
    );

router.get('/child/:id', isAdmin, controller.getChildById);

router.get('/child/:id/class', isAdmin, controller.getChildClassInfo);


module.exports = router;