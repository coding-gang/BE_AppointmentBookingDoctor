const express = require('express');

const router = express.Router();

const specialitieController = require('../controllers/specialitieController');

router.route('/specialities').get(specialitieController.getAll);
router.route('/speciality/:specialityId').put(specialitieController.isExistNameSpec, specialitieController.update);
router.route('/speciality/:specialityId').delete(specialitieController.isExistSpecialities , specialitieController.delete);
router.route('/speciality/:specialityId').get(specialitieController.getById);

module.exports =router;