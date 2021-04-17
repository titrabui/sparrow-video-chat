import mongooseLoader from './mongoose'
import dependencyLoader from './dependencyInjector'
import Logger from './logger'

export default async () => {
  await mongooseLoader()
  Logger.info('✌️  DB loaded and connected!')

  await dependencyLoader()
  Logger.info('✌️  Dependency Injector loaded')
}
