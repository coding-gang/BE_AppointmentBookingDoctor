const express = require('express');

const router = express.Router();

const specialitieController = require('../controllers/specialityController');

router.route('/specialities').get(specialitieController.getAll);
router.route('/speciality/:specialityId').put(specialitieController.isExistNameSpec, specialitieController.update);
router.route('/speciality/:specialityId').delete(specialitieController.isExistSpecialities , specialitieController.delete);
router.route('/speciality/:specialityId').get(specialitieController.getById);
router.route('/specialities').post(specialitieController.isExistNameSpec,specialitieController.insert)

module.exports =router;