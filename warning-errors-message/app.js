const amqb = require('amqplib')

async function consumeMessages(){
  const url = 'amqp://root:rootPwd@localhost'
  const exchangeKey = 'logExchange'
  const connection = await amqb.connect(url)
  const channel = await connection.createChannel()

  await channel.assertExchange(exchangeKey,'direct')

  const queue = await channel.assertQueue("WarningAndErrorsQueue")

  await channel.bindQueue(queue.queue,exchangeKey,'Warning')
  await channel.bindQueue(queue.queue,exchangeKey,'Error')

  channel.consume(queue.queue,(msg)=>{
    const data = JSON.parse(msg.content)
    console.log(data)
    channel.ack(msg)
  })

}
consumeMessages()