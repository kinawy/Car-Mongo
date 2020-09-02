const mongoose = require("mongoose")


// Create Bounty Schema
let driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  age: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
})

// Export the model
module.exports = mongoose.model('Driver', driverSchema)