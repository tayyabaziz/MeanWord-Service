const { WordModel } = require('../models/all.models')
const { ResourceNotFoundError, DatabaseError } = require('../errors/errors')

class WordService {
  constructor () {
    this.Word = new WordModel()
  }

  getAllWords (data) {
    return new Promise((resolve, reject) => {
      this.Word
        .find()
        .skip(data.offset).limit(data.limit)
        .exec((err, data) => {
          if (err) {
            reject(new DatabaseError(err.message, err.name))
          } else {
            if (data === undefined || data.length === 0) {
              reject(new ResourceNotFoundError('Words'))
            } else {
              resolve(data)
            }
          }
        })
    })
  }

  getWord (data) {
    return new Promise((resolve, reject) => {
      this.Word
        .findById(data.wordId)
        .exec((err, data) => {
          console.log(err)
          if (err) {
            reject(new DatabaseError(err.message, err.name))
          } else {
            if (data === undefined || data.length === 0) {
              reject(new ResourceNotFoundError('Word'))
            } else {
              resolve(data)
            }
          }
        })
    })
  }

  createWord (data) {
    return new Promise((resolve, reject) => {
      this.Word
        .create(data.wordData, { new: true, runValidators: true })
        .exec((err, data) => {
          if (err) {
            reject(new DatabaseError(err.message, err.name))
          } else {
            if (data === undefined || data.length === 0) {
              reject(new ResourceNotFoundError('Word'))
            } else {
              resolve(data)
            }
          }
        })
    })
  }

  updateWord (data) {
    return new Promise((resolve, reject) => {
      this.Word
        .findByIdAndUpdate(data.wordId, data.wordData, { new: true, runValidators: true })
        .exec((err, data) => {
          if (err) {
            reject(new DatabaseError(err.message, err.name))
          } else {
            if (data === undefined || data.length === 0) {
              reject(new ResourceNotFoundError('Word'))
            } else {
              resolve(data)
            }
          }
        })
    })
  }
}

module.exports = WordService
