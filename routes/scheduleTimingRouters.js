const express = require("express");

const router = express.Router();

const scheduleTiming = require('../controllers/scheduleTimingController');
  router.route('/schedules').get(scheduleTiming.getAll);
  router.route('/schedule/:id')
        .get(scheduleTiming.getbyId)
        .post(scheduleTiming.checkTiming,scheduleTiming.checkExistTiming ,scheduleTiming.Add)
        .put(scheduleTiming.checkTiming,scheduleTiming.checkExistTiming,scheduleTiming.update)
        .delete(scheduleTiming.delete);
    router.route('/schedule/:doctorId/get/:id').get(scheduleTiming.getScheduleById);
module.exports = router;