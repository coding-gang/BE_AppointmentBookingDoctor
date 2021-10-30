const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.route('/doctors').get(doctorController.getAll);
router.route('/doctor/:doctorId').get(doctorController.getById);
router.route('/doctor/:doctorId').put(doctorController.update);
router.route('/doctor/:doctorId').delete(doctorController.delete);
router.route('/update-password/:doctorId').put(doctorController.checkExistPass,doctorController.updatePass);
module.exports = router;