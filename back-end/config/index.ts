import dotenv from 'dotenv'

const envFound = dotenv.config()
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const processType = process.env.PROCESS_TYPE
let config
try {
  config = require('./web').default
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process type: ${processType}`)
  }

  throw ex
}

export default config
