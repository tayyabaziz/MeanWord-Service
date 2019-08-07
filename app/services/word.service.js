const ObjectId = require('mongoose').Types.ObjectId
const { WordModel } = require('../models/all.models')
const { ResourceNotFoundError, DatabaseError, InvalidDataError } = require('../errors/errors')

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
      if (ObjectId.isValid(data.wordId)) {
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
      } else {
        reject(new InvalidDataError('Word ID'))
      }
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
      if (ObjectId.isValid(data.wordId)) {
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
      } else {
        reject(new InvalidDataError('Word ID'))
      }
    })
  }
}

module.exports = WordService
