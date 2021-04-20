import { Container } from 'typedi'
import { Logger } from 'winston'

const attachCurrentUser = async (req, res, next) => {
  const Logger: Logger = Container.get('logger')

  try {
    const userModel: Models.UserModel = Container.get('UserModel')
    const userRecord = await userModel.findById(req.token._id)
    if (!userRecord) {
      return res.sendStatus(401)
    }

    const currentUser = userRecord.toObject()
    Reflect.deleteProperty(currentUser, 'password')
    Reflect.deleteProperty(currentUser, 'salt')
    req.currentUser = currentUser

    return next()
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e)
    next(e)
  }
}

export default attachCurrentUser
