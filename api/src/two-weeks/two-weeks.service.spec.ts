import { Test, TestingModule } from '@nestjs/testing';
import { TwoWeeksService } from './two-weeks.service';

describe('TwoWeeksService', () => {
  let service: TwoWeeksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoWeeksService],
    }).compile();

    service = module.get<TwoWeeksService>(TwoWeeksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
