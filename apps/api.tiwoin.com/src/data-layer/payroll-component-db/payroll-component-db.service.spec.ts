import { Test, TestingModule } from '@nestjs/testing';
import { PayrollComponentDbService } from './payroll-component-db.service';

describe('PayrollComponentDbService', () => {
  let service: PayrollComponentDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollComponentDbService],
    }).compile();

    service = module.get<PayrollComponentDbService>(PayrollComponentDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
