import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import { celebrate, Joi } from 'celebrate'
import { Logger } from 'winston'
import { IUserInputDTO } from '../../interfaces/IUser'
import AuthService from '../services/auth'

const route = Router()
const Logger : Logger = Container.get('logger')

export default (app: Router) => {
  app.use('/auth', route)

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger')

      try {
        const authService = Container.get(AuthService)
        const { user, token } = await authService.signUp(req.body)
        return res.status(201).json({ user, token })
      } catch (error) {
        logger.error('🔥 error: %o', error)
        next(error)
      }
    }
  )

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger')

      try {
        const authService = Container.get(AuthService)
        const { email, password } = req.body
        const { user, token } = await authService.signIn(email, password)
        return res.status(200).json({ user, token })
      } catch (error) {
        logger.error('🔥 error: %o', error)
        next(error)
      }
    }
  )
}
