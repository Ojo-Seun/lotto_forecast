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
import { GetEventsDataPipe } from './pipes/get-events-data-pipe'
import { GetEventsDTO } from './dto/getEventsDto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetChart } from './decorators/get-chart.decorator'
import { GetChartDTO } from './dto/get-chartDto'
import { GetYears } from './decorators/get-years.decorator'

@Controller('games/data')
@ApiTags('Games Data')
export class DataController {
  constructor(private readonly dataService: DataService, private readonly errorObj: ErrorObjectService) {}

  @Post()
  @Auth('ADMINISTRATOR')
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

  @Post('game-events')
  @Auth('USER')
  @UsePipes(GetEventsDataPipe)
  @ApiBody({ type: GetEventsDTO })
  async getEvents(@Body('payload') payload: GetEventsDTO) {
    try {
      return this.dataService.getEvents(payload)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error occured', error.message, HttpStatus.EXPECTATION_FAILED)
      throw new HttpException(response, status, options)
    }
  }

  @Post('insert_many')
  @Auth('ADMINISTRATOR')
  @UsePipes(InsertManyPipe)
  @ApiBody({ type: DataInsertManyDto })
  async insertMany(@Body('payload') data: DataInsertManyDto) {
    try {
      return this.dataService.insertMany(data as InsertMany)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error from insertMany method', error.message)
      throw new HttpException(response, status, options)
    }
  }

  @Patch('insert_one')
  @Auth('ADMINISTRATOR')
  @UsePipes(InserOnePipe)
  @ApiBody({ type: DataInsertOneDto })
  async insertOne(@Body('payload') data: DataInsertOneDto) {
    try {
      return await this.dataService.insertOne(data.game, data.payload)
    } catch (error) {
      const { response, status, options } = this.errorObj.error('error from update method', error.message)
      throw new HttpException(response, status, options)
    }
  }

  @Post('chart')
  @GetChart()
  async getChart(@Body('payload') payload: GetChartDTO) {
    try {
      return await this.dataService.getChart(payload)
    } catch (error) {
      const { response, status, options } = this.errorObj.error(error.message, error.message)
      throw new HttpException(response, status, options)
    }
  }

  @Post('years')
  @GetYears()
  async getYears(@Body('payload') payload: GetChartDTO) {
    try {
      return await this.dataService.getYears(payload)
    } catch (error) {
      const { response, status, options } = this.errorObj.error(error.message, error.message)
      throw new HttpException(response, status, options)
    }
  }
}
