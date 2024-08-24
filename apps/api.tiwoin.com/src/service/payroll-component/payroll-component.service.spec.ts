import { Test, TestingModule } from '@nestjs/testing';
import { PayrollComponentService } from './payroll-component.service';

describe('PayrollComponentService', () => {
  let service: PayrollComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollComponentService],
    }).compile();

    service = module.get<PayrollComponentService>(PayrollComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
