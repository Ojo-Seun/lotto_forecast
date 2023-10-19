import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UpdateUserDto } from '../auth/dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'

import { USER } from './interface/user.interface'
import { ResetPassDto } from 'src/auth/dto/reset-pass.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(user: USER) {
    try {
      const newUser = await this.userModel.create(user)
      return newUser
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    return user
  }

  async resetPassword(payload: ResetPassDto) {
    try {
      const { email, code, password } = payload
      const user = await this.userModel.findOne({ email })
      if (!user?.email) {
        throw new UnauthorizedException('user does not exist')
      }
      // Update user
      const updateUser = await this.userModel.findOneAndUpdate({ email }, { code, password })
      if (updateUser?._id) {
        return true
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
