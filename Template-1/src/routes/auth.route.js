var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin/auth.controller')

router.route('/login').post(controller.login);

module.exports = router;
