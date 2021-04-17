import joi from 'joi'

const schema = joi.object({
  NODE_ENV: joi.string()
    .allow('development', 'production', 'test', 'provision')
    .default('development')
}).unknown()
  .required()

const { error, value: envVars } = schema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  env: envVars.NODE_ENV
}
