const express = require('express');
const router = express.Router();

const { wordController } = require('../controller');

// * GET /links
router.get('/', wordController.list.get);

// * POST /links
router.post('/', wordController.add.post);

router.delete('/', wordController.delete.delete);

module.exports = router;
