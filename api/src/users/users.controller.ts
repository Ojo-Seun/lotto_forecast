import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from '../auth/dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
