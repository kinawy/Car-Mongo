// Get creative! Must include one collection + at least one association - embedded or reference is fine, but maybe challenge yourself to do both!  Must have full CRUD on at least one collection. Feel free to just do a straight mimic of the bounty hunters server but with new schema :) We'll post a thread in slack in the morning for you to send us your github links.

const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use('/drivers', require('./controllers/drivers'))
app.use('/cars', require('./controllers/cars'))

app.get('/', (req, res) => {
    res.send('This works home page')
})

app.listen(3000, () => {
    console.log('This Works')
})