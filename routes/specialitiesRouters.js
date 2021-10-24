const express = require('express');

const router = express.Router();

const specialitieController = require('../controllers/specialitieController');

router.route('/specialities').get(specialitieController.getAll);
router.route('/speciality/:specialityId').put(specialitieController.update);
router.route('/speciality/:specialityId').delete(specialitieController.delete);
router.route('/speciality/:specialityId').get(specialitieController.getById);

module.exports =router;