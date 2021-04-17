import { Container } from 'typedi'
import Logger from '../loaders/logger'

const DEPENENCY_OBJECTS = [
  // Models
  { name: 'UserModel', object: require('../models/user').default },

  // Logger
  { name: 'logger', object: require('./logger').default }
]

export default () => {
  try {
    DEPENENCY_OBJECTS.forEach(item => {
      Container.set(item.name, item.object)
    })
  } catch (error) {
    Logger.error('🔥 Error on dependency injector loader: %o', error);
    throw error
  }
}
