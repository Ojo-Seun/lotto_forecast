import { Test, TestingModule } from '@nestjs/testing';
import { TwoWeeksController } from './two-weeks.controller';
import { TwoWeeksService } from './two-weeks.service';

describe('TwoWeeksController', () => {
  let controller: TwoWeeksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoWeeksController],
      providers: [TwoWeeksService],
    }).compile();

    controller = module.get<TwoWeeksController>(TwoWeeksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
