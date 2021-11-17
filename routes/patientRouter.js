const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
router.route('/patients').get(patientController.getAll);
// router.route('/doctor/:doctorId').get(doctorController.getById);
router.route('/patient').post(patientController.checkExistUserName, patientController.Add);
router.route('/patient/:patientId').put(patientController.update)
.delete(patientController.checkExistPatient,patientController.delete);
// router.route('/doctor/update-password/:doctorId').put(doctorController.checkExistPass,doctorController.updatePass);
// router.route('/doctor/login').post(doctorController.login);

module.exports = router;
