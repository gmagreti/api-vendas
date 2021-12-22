import { hash } from 'bcryptjs'
import { isAfter, addHours } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import { AppError } from 'shared/errors/AppError'

import UsersRepository from '../typeorm/repositories/UsersRepository'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ password, token }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)

    const userTokenRepository = getCustomRepository(UserTokenRepository)

    const userToken = await userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exist.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    const hashedPassword = await hash(password, 8)

    user.password = hashedPassword
  }
}

export { ResetPasswordService }
