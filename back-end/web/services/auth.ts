import { Service, Inject } from 'typedi'
import argon2 from 'argon2'
import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import { IUser, IUserInputDTO } from '../../interfaces/IUser'
import config from '../../config'

@Service()
export default class AuthService {
  constructor(
    @Inject('UserModel') private userModel: Models.UserModel,
    @Inject('logger') private logger
  ) { }

  public async signUp(userInput: IUserInputDTO): Promise<{ user: IUser, token: string }> {
    try {
      const salt = randomBytes(32)

      this.logger.silly('Hasing password')
      const hashedPassword = await argon2.hash(userInput.password, { salt })

      this.logger.silly('Create user record')
      const userRecord = await this.userModel.create({
        ...userInput,
        salt: salt.toString('hex'),
        password: hashedPassword
      })

      if (!userRecord) {
        throw new Error('Create user failed')
      }

      const token = this.generateToken(userRecord)

      const user = userRecord.toObject()
      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')
      return { user, token }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  public async signIn(email: string, password: string): Promise<{ user: IUser, token: string }> {
    try {
      const userRecord = await this.userModel.findOne({ email })
      if (!userRecord) {
        throw new Error('Invalid email or password')
      }

      const validPassword = await argon2.verify(userRecord.password, password)
      if (!validPassword) {
        throw new Error('Invalid email or password')
      }

      const token = this.generateToken(userRecord)

      const user = userRecord.toObject()
      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')
      return { user, token }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  private generateToken(user): string {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    this.logger.silly(`Sign JWT for userId: ${user._id}`)
    return jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000
      },
      config.jwtSecret
    )
  }
}
