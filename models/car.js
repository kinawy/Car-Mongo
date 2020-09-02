const mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 99
    },
    model: String,
  })

  module.exports = mongoose.model('Car', carSchema)
  