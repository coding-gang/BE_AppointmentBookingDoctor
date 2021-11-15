const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
router.route('/patients').get(patientController.getAll);
// router.route('/doctor/:doctorId').get(doctorController.getById);
// router.route('/doctor').post(doctorController.checkExistUserName, doctorController.Add);
// router.route('/doctor/:doctorId').put(doctorController.update);
// router.route('/doctor/:doctorId').delete(doctorController.delete);
// router.route('/doctor/update-password/:doctorId').put(doctorController.checkExistPass,doctorController.updatePass);
// router.route('/doctor/login').post(doctorController.login);

module.exports = router;
