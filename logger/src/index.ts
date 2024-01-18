import express from 'express'
import bodyParser from 'body-parser'
import { Producer } from './producer'

const producer = new Producer()

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    message: 'Hello from Rabbit MQ'
  })
})
app.post('/sendLog', async (req, res) => {

  await producer.publishMessage(req.body.type, req.body.message)
  res.send({
    ...req.body
  })
})

app.listen(3000, () => {
  console.log('Server start at http://localhost:3000')
})
