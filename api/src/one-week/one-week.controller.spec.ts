import { Test, TestingModule } from '@nestjs/testing';
import { OneWeekController } from './one-week.controller';
import { OneWeekService } from './one-week.service';

describe('OneWeekController', () => {
  let controller: OneWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneWeekController],
      providers: [OneWeekService],
    }).compile();

    controller = module.get<OneWeekController>(OneWeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
