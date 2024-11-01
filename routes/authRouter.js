const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require ('../middleware/authMidlleware')

router.post('/register', authController.registerMember);
router.post('/login', authController.login);
router.post('/superadmin/login',authController.superadminLogin);
router.post('/admin/login',authenticate,authController.addAdmin);

module.exports = router;
