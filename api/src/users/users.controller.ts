import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from '../auth/dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth('ADMINISTRATOR')
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Auth('USER')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @Auth('USER')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @Auth('ADMINISTRATOR')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
