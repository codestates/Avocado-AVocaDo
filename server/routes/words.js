const express = require('express');
const router = express.Router();

const { wordController } = require('../controller');

// * GET /links
router.get('/', wordController.list.get);

// * POST /links
router.post('/', wordController.add.post);

router.post('/words/edit', wordController.edit.post);

router.post('/words/delete', wordController.delete.post);

module.exports = router;
