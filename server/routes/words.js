const express = require('express');
const router = express.Router();

const { wordController } = require('../controller');

// * GET /links
router.get('/', wordController.list.get);

// * POST /links
router.post('/', wordController.add.post);

router.put('/', wordController.edit.put);

router.delete('/', wordController.delete.delete);

router.get('/sentences', wordController.listSentence.get);

router.post('/sentences', wordController.addSentence.post);

router.put('/sentences', wordController.editSentence.put);

router.delete('/sentences', wordController.deleteSentence.delete);

module.exports = router;
