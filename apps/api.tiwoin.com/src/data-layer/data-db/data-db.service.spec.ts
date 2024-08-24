import { Test, TestingModule } from '@nestjs/testing';
import { DataDbService } from './data-db.service';

describe('DataDbService', () => {
  let service: DataDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataDbService],
    }).compile();

    service = module.get<DataDbService>(DataDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
