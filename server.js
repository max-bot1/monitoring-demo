const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'2f7739ffda554585a9e2e5cf9e0bb827',
    captureUncaught: true,
    captureUncaught: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body 
    name = name.trim()

    students.push(name)
    rollbar.log('Sudent added successfully', {author: 'Max', type: 'manual entry'})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

// app.get('/', (req, res) => {
//     res.
// })

app.listen(port, () => console.log(`Activity detected in sector ${port}`))