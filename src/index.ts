import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { Producer } from './producer'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    message: 'Hello from Rabbit MQ'
  })
})
app.post('/sendLog', async (req, res, next) => {
  const producer = new Producer()
  await producer.publishMessage(req.body.logType, req.body.message)
  res.send()
})

app.listen(3000, () => {
  console.log('Server start at http://localhost:3000')
})
