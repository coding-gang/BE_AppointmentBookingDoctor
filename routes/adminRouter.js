const express = require("express");

const router = express.Router();

const adminController = require('../controllers/adminController');

router.route('/admins').get(adminController.getAll);
router.route('/admin/:adminId').get(adminController.getById);
router.route('/admin/:adminId').put(adminController.update);
module.exports = router;