import common from './components/common'
import server from './components/server'
import logger from './components/logger'
import jwt from './components/jwt'
import mongoose from './components/mongoose'

export default {
  env: common.env,

  /**
   * Used by starting target process
   */
  port: server.port,

  /**
   * API configs
   */
  api: {
    prefix: server.api_prefix
  },

  /**
   * Used by winston logger
   */
  logger: {
    level: logger.level,
    enabled: logger.enabled
  },

  /**
   * JWT secret
   */
  jwtSecret: jwt.secret,
  jwtAlgorithm: jwt.algorithm,

  /**
   * Mongo DB database URL
   */
  databaseURL: mongoose.databaseURL
}
