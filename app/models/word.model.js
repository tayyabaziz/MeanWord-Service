const mongoose = require('mongoose')

class WordModel {
  constructor (Sequelize, sequelize) {
    const collectionName = 'words'
    const collectionField = {
      word: {
        type: String,
        required: [true, 'Word must be string and is required']
      },
      meaning: {
        type: String,
        required: [true, 'Meaning must be string and is required']
      }
    }
    var wordSchema = new mongoose.Schema(collectionField)
    var wordModel = mongoose.model(collectionName, wordSchema)
    return wordModel
  }
}

module.exports = WordModel
