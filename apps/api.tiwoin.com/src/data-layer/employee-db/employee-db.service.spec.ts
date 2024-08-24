import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDbService } from './employee-db.service';

describe('EmployeeDbService', () => {
  let service: EmployeeDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDbService],
    }).compile();

    service = module.get<EmployeeDbService>(EmployeeDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
