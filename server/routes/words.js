const express = require('express');
const router = express.Router();

const { wordController } = require('../controller');

// * GET /links
router.get('/', wordController.get);

// * POST /links
router.post('/', wordController.post);

module.exports = router;
