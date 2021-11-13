const express = require("express");

const router = express.Router();

const scheduleTiming = require('../controllers/scheduleTimingController');
router.route('/schedule/add').post(scheduleTiming.checkTiming,scheduleTiming.Add);

module.exports = router;