import joi from 'joi'

const schema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow('error', 'warn', 'info', 'verbose', 'debug', 'silly')
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = schema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  level: envVars.LOGGER_LEVEL,
  enabled: envVars.LOGGER_ENABLED
}
