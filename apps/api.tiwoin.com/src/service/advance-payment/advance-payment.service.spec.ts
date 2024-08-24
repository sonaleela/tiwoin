import { Test, TestingModule } from '@nestjs/testing';
import { AdvancePaymentService } from './advance-payment.service';

describe('AdvancePaymentService', () => {
  let service: AdvancePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancePaymentService],
    }).compile();

    service = module.get<AdvancePaymentService>(AdvancePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
