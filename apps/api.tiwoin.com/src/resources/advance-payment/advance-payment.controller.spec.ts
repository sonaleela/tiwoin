import { Test, TestingModule } from '@nestjs/testing';
import { AdvancePaymentController } from './advance-payment.controller';
import { AdvancePaymentService } from '../../service/advance-payment/advance-payment.service';

describe('AdvancePaymentController', () => {
  let controller: AdvancePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancePaymentController],
      providers: [AdvancePaymentService],
    }).compile();

    controller = module.get<AdvancePaymentController>(AdvancePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
