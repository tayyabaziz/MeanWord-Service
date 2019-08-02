const express = require('express')
const router = express.Router()

const { WordControllerClass } = require('../controllers/all.controllers')
const WordController = new WordControllerClass()

router.get('/', WordController.listAllWords)
router.post('/', WordController.addWord)
router.get('/:wordId', WordController.readWord)
router.put('/:wordId', WordController.updateWord)

module.exports = router
