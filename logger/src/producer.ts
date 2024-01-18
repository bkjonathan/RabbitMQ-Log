import ampq from 'amqplib'

export class Producer {
  private readonly config = {
    // url: 'amqp://localhost:15672',
    url: 'amqp://root:rootPwd@rabbitMQ',
    exchangeName: 'logExchange'
  }
  private channel: any = null

  async createChannel() {
    try {
      const connection = await ampq.connect(this.config.url)
      this.channel = await connection.createChannel()
    } catch (e) {
      console.log(e)
    }
  }

  async publishMessage(type: string, message: string): Promise<void> {
    try {
      if (!this.channel) {
        await this.createChannel()
      }
      await this.channel.assertExchange(this.config.exchangeName, 'direct')

      await this.channel.publish(
        this.config.exchangeName,
        type,
        Buffer.from(JSON.stringify({ type, message, dateTime: Date.now() }))
      )
      console.log(`This message ${message} is send to exchange ${this.config.exchangeName}`)
    } catch (e) {
      console.log(e)
    }
  }
}
