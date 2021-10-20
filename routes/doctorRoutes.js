const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.route('/doctors').get(doctorController.getAll);

module.exports = router;