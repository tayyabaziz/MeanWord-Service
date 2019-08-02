const WordServiceClass = require('../services/word.service')
const ErrorHandler = require('../handlers/error.handler')
const ResponseHandler = require('../handlers/response.handler')
const WordService = new WordServiceClass()

class WordController {
  async listAllWords (req, res) {
    try {
      var data = await WordService.getAllWords()
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readWord (req, res) {
    try {
      var data = await WordService.getWord({ wordId: req.params.wordId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addWord (req, res) {
    try {
      var wordData = req.body
      var word = {
        word: (wordData.word !== undefined) ? wordData.word : null,
        meaning: (wordData.meaning !== undefined) ? wordData.meaning : null
      }
      var data = await WordService.createWord({ wordData: word })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async updateWord (req, res) {
    try {
      var wordData = req.body
      var word = {
        word: (wordData.word !== undefined) ? wordData.word : null,
        meaning: (wordData.meaning !== undefined) ? wordData.meaning : null
      }
      var data = await WordService.updateWord({ wordId: req.params.wordId, wordData: word })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = WordController
