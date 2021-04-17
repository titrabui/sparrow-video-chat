import joi from 'joi'

const schema = joi.object({
  WEB_PORT: joi.number()
    .required(),
  API_PREFIX: joi.string()
    .default('/api')
}).unknown()
  .required()

const { error, value: envVars } = schema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  port: envVars.WEB_PORT,
  api_prefix: envVars.API_PREFIX
}
