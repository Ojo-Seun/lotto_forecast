import { Controller, Body, Patch, Post, UsePipes, HttpException, HttpStatus } from '@nestjs/common'
import { DataService } from './data.service'
import { GameTypes, Games } from 'src/games/interface/types'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { DataInsertManyDto } from './dto/dataInsertManyDto'
import { DataInsertOneDto } from './dto/dataInsertOneDto'
import { games } from 'src/games/utils/util'
import { InserOnePipe } from './pipes/inserOne.pipe'
import { InsertManyPipe } from './pipes/insertMany.pipe'
import { GameDetailsPipe } from './pipes/gameDetails.pipe'
import { GameDetailsDto } from './dto/gameDetailsDto'
import { ErrorObjectService } from '../global-utils/error-object.service'
import { InsertMany } from './interface/insert_many.interfer'

@Controller('games/data')
@ApiTags('Games Data')
export class DataController {
  constructor(private readonly dataService: DataService, private readonly errorObj: ErrorObjectService) {}

  @Post()
  @UsePipes(GameDetailsPipe)
  @ApiBody({ enum: games, required: true })
  async getGameDetails(@Body('payload') payload: GameDetailsDto) {
    try {
      return this.dataService.getGameDetails(payload.game)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error from GameDetails method', error.message)
      throw new HttpException(response, status, options)
    }
  }

  @Post('insert_many')
  @UsePipes(InsertManyPipe)
  @ApiBody({ type: DataInsertManyDto })
  async insertMany(@Body('data') data: DataInsertManyDto) {
    try {
      return this.dataService.insertMany(data as InsertMany)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error from insertMany method', error.message)
      throw new HttpException(response, status, options)
    }
  }

  @Patch('update')
  @UsePipes(InserOnePipe)
  @ApiBody({ type: DataInsertOneDto })
  async update(@Body('data') data: DataInsertOneDto) {
    try {
      return await this.dataService.update(data.game, data.payload)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error from update method', error.message)
      throw new HttpException(response, status, options)
    }
  }
}
