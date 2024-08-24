import { Test, TestingModule } from '@nestjs/testing';
import { PayrollDbService } from './payroll-db.service';

describe('PayrollDbService', () => {
  let service: PayrollDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollDbService],
    }).compile();

    service = module.get<PayrollDbService>(PayrollDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
