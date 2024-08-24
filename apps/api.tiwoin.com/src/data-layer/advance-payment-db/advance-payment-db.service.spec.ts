import { Test, TestingModule } from '@nestjs/testing';
import { AdvancePaymentDbService } from './advance-payment-db.service';

describe('AdvancePaymentDbService', () => {
  let service: AdvancePaymentDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancePaymentDbService],
    }).compile();

    service = module.get<AdvancePaymentDbService>(AdvancePaymentDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
