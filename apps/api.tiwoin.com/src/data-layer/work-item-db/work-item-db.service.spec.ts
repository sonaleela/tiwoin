import { Test, TestingModule } from '@nestjs/testing';
import { WorkItemDbService } from './work-item-db.service';

describe('WorkItemDbService', () => {
  let service: WorkItemDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkItemDbService],
    }).compile();

    service = module.get<WorkItemDbService>(WorkItemDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
