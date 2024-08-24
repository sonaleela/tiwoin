import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';

describe('DataController', () => {
  let controller: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [],
    }).compile();

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
