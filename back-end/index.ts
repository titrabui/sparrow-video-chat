import 'reflect-metadata' // We need this in order to use @Decorators
import loaders from './loaders'
import Logger from './loaders/logger'

const type = process.env.PROCESS_TYPE

Logger.info(`Starting '${type}' process`, { pid: process.pid })

const startServer = async () => {
  await loaders()

  if (type === 'web') {
    require('./web')
  } else {
    throw new Error(`
      ${type} is an unsupported process type.
      Use one of: 'web', 'xxx-worker'!
    `)
  }
}

startServer()
