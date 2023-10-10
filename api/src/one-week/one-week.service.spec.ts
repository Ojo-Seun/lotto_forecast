import { Test, TestingModule } from '@nestjs/testing';
import { OneWeekService } from './one-week.service';

describe('OneWeekService', () => {
  let service: OneWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneWeekService],
    }).compile();

    service = module.get<OneWeekService>(OneWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
