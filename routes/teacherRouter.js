const express = require('express');

const controller = require('../controllers/teacherController');
const validator = require('../middlewares/validations/validationMW');
const teacherValidation = require("../middlewares/validations/teacherValidation");
const { isAdmin, isAdminOrTeacher } = require('../middlewares/authentcationMW');

const router = express.Router();

router.route('/teachers')
    .get(isAdmin, controller.getAllTeachers)
    .patch(isAdminOrTeacher,
        teacherValidation.patchValidation,
        validator,
        controller.updateTeacher
    )
    .delete(
        isAdminOrTeacher,
        teacherValidation.deleteValidation,
        validator,
        controller.deleteTeacher
    );


router.get('/teachers/supervisors', isAdmin, controller.getAllClassSupervisors)

router.get('/teachers/:id', isAdminOrTeacher, controller.getTeacherById)

module.exports = router;