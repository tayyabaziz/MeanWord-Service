const WordServiceClass = require('../services/word.service')
const ErrorHandler = require('../handlers/error.handler')
const ResponseHandler = require('../handlers/response.handler')
const WordService = new WordServiceClass()

class WordController {
  async listAllWords (req, res) {
    try {
      let page = req.query.page ? req.query.page : 1
      let limit = req.query.limit ? req.query.limit : 10
      page = parseInt(page, 10)
      limit = parseInt(limit, 10)
      const offset = (page - 1) * limit
      const data = await WordService.getAllWords({ offset: offset, limit: limit })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readWord (req, res) {
    try {
      const data = await WordService.getWord({ wordId: req.params.wordId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addWord (req, res) {
    try {
      const wordData = req.body
      if (wordData.length === 1) {
        const word = {
          word: (wordData.word !== undefined) ? wordData.word : null,
          meaning: (wordData.meaning !== undefined) ? wordData.meaning : null
        }
        const data = await WordService.createWord({ wordData: word })
        return new ResponseHandler(data, req.method, res)
      } else {
        const words = []
        wordData.forEach(element => {
          const word = {
            word: (element.word !== undefined) ? element.word : null,
            meaning: (element.meaning !== undefined) ? element.meaning : null
          }
          words.push(word)
        })
        console.log(words.length)
        const data = await WordService.createWord({ wordData: words })
        return new ResponseHandler(data, req.method, res)
      }
    } catch (err) {
      console.log(err)
      return new ErrorHandler(err, res)
    }
  }

  async updateWord (req, res) {
    try {
      const wordData = req.body
      const word = {
        word: (wordData.word !== undefined) ? wordData.word : null,
        meaning: (wordData.meaning !== undefined) ? wordData.meaning : null
      }
      const data = await WordService.updateWord({ wordId: req.params.wordId, wordData: word })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = WordController
