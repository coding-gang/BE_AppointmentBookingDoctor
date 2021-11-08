const express = require('express');
const { route } = require('../app');

const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.route('/doctors').get(doctorController.getAll);
router.route('/doctor/:doctorId').get(doctorController.getById);
router.route('/doctor').post(doctorController.checkExistUserName, doctorController.Add);
router.route('/doctor/:doctorId').put(doctorController.update);
router.route('/doctor/:doctorId').delete(doctorController.delete);
router.route('/doctor/update-password/:doctorId').put(doctorController.checkExistPass,doctorController.updatePass);
module.exports = router;