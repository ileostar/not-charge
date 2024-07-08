const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const dataStorage = []

app.post('/api/data', (req, res) => {
  const data = req.body
  dataStorage.push(data)
  res.status(200).send('Data stored')
})

app.get('/api/data', (req, res) => {
  res.json(dataStorage)
})

// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to my API server') // Replace with your message or HTML content
})

app.listen(port, () => {
  // console.log(`Server running at http://localhost:${port}`)
})
