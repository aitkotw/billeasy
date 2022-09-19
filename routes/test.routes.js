
const express = require('express');
const testControllers = require('../controllers/test.controllers');
const router = express.Router();
const authentication = require('../middleware/auth.middleware');

router.get('/get', authentication, testControllers.getAll);

module.exports = router