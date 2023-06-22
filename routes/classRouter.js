const express = require('express');

const controller = require('../controllers/classController');
const validator = require('../middlewares/validations/validationMW');
const classValidation = require("../middlewares/validations/classValidation");
const { isAdmin, isAdminOrSupervisor } = require('../middlewares/authentcationMW');

const router = express.Router();

router.route('/class')
    .all(isAdmin)
    .get(controller.getAllClasses)
    .post(
        classValidation.postValidation,
        validator,
        controller.addNewClass
    )
    .patch(classValidation.patchValidation,
        validator,
        controller.updateClass
    )
    .delete(classValidation.deleteValidation,
        validator,
        controller.deleteClass
    );

router.get('/class/:id', isAdminOrSupervisor, controller.getClassById);

// case of supervisor => check if he is a supervisor for that class
router.get('/class/:id/child', isAdminOrSupervisor, controller.getClassChildsInfo);

router.get('/class/:id/teacher', isAdminOrSupervisor, controller.getClassTeacherInfo);



module.exports = router;