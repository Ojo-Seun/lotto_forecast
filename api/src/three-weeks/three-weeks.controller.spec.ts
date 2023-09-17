import { Test, TestingModule } from '@nestjs/testing'
import { ThreeWeeksController } from './three-weeks.controller'
import { ThreeWeeksService } from './three-weeks-search.service'

describe('ThreeWeeksController', () => {
  let controller: ThreeWeeksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreeWeeksController],
      providers: [ThreeWeeksService],
    }).compile()

    controller = module.get<ThreeWeeksController>(ThreeWeeksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
