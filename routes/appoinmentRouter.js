
const express = require("express");

const router = express.Router();

const appointController = require('../controllers/appointmentController');
const passport =require('passport');
router.route('/appointments-patient').get(appointController.getAllApointmentPatients);
router.route('/appointments-doctor').get(appointController.getAllApointmentDoctors)
router.route('/appointment').post(appointController.insert);
router.route('/appointment/:appointmentId').put(appointController.update)
.delete(appointController.delete)
.get(appointController.getById);

module.exports = router;