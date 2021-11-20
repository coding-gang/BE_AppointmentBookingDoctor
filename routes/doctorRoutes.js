const express = require('express');
const passport =require('passport');

const router = express.Router();
const doctorController = require('../controllers/doctorController');
router.route('/doctors').get(doctorController.getAll);
router.route('/doctor/:doctorId').get(doctorController.getById);
router.route('/doctor').post(doctorController.checkExistUserName, doctorController.Add);
router.route('/doctor/:doctorId').put(doctorController.update);
router.route('/doctor/:doctorId').delete(doctorController.delete);
router.route('/doctor/update-password/:doctorId').put(doctorController.checkExistPass,doctorController.updatePass);
router.route('/doctor/login').post(doctorController.login);
router.route('/sheduleTiming').get(passport.authenticate('jwt',{session:false}), doctorController.getSheduleTimings);
module.exports = router;

