import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UpdateUserDto } from '../auth/dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'

import { USER } from './interface/user.interface'

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

  findAll() {
    return `This action returns all users`
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
