import { Test, TestingModule } from '@nestjs/testing'
import { ThreeWeeksService } from './three-weeks-search.service'

describe('ThreeWeeksService', () => {
  let service: ThreeWeeksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreeWeeksService],
    }).compile()

    service = module.get<ThreeWeeksService>(ThreeWeeksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
