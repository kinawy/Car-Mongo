const mongoose = require('mongoose')

// Set up connection for mongoose
mongoose.connect('mongodb://localhost/driver-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

// Set DB for alias
const db = mongoose.connection

// set up an event listener to fire once the connection opens
db.once('open', () => {
    console.log(`Connected to MongoDB @ ${db.host}:${db.port}`)
})

// error handler for the db
db.on('error', (error) => {
    console.error(`database error:\n${error}`)
})

// export things
module.exports.Car = require('./car')
module.exports.Driver = require('./driver')