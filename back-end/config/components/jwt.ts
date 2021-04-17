import joi from 'joi'

const schema = joi.object({
  JWT_SECRET: joi.string()
    .required(),
  JWT_ALGO: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = schema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  secret: envVars.JWT_SECRET,
  algorithm: envVars.JWT_ALGO
}
