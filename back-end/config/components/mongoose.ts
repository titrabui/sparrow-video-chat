import joi from 'joi'

const schema = joi.object({
  MONGODB_URI: joi.string()
    .required(),
}).unknown()
  .required()

const { error, value: envVars } = schema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  databaseURL: envVars.MONGODB_URI
}
