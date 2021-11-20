const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
router.route('/patients').get(patientController.getAll);
router.route('/patient/:patientId').get(patientController.getById);
router.route('/patient').post(patientController.checkExistUserName, patientController.Add);
router.route('/patient/:patientId').put(patientController.update)
.delete(patientController.checkExistPatient,patientController.delete);
router.route('/patient/update-password/:patientId').put(patientController.checkExistPass,patientController.updatePass);
router.route('/patient/login').post(patientController.login);

module.exports = router;
