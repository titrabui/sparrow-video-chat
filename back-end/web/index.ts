import express from 'express'
import config from '../config'
import Logger from '../loaders/logger'

const port = config.port || 3000
const startServer = async () => {
  const app = express()

  await require('./server').default({ app })

  app.listen(port, () => {
    Logger.info(`✌️  Web server is listening on port: ${port}`)
  }).on('error', () => {
    process.exit(1)
  })
}

startServer()
