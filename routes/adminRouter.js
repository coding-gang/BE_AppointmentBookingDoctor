const express = require("express");

const router = express.Router();

const adminController = require('../controllers/adminController');

router.route('/admins').get(adminController.getAll);
router.route('/admin/:adminId').get(adminController.checkExistAdmin,adminController.getById);
router.route('/admin/:adminId').put(adminController.checkUpdateAdminValid,adminController.update);
router.route('/admin').post(adminController.checkUpdateAdminValid,adminController.insert);
router.route('/admin/:adminId').delete(adminController.checkExistAdmin,adminController.deleteAdmin);
router.route('/admin/update-password/:doctorId').put(adminController.checkExistPass,adminController.updatePass);

module.exports = router;