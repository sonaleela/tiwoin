import { Module } from '@nestjs/common';
import { AdvancePaymentService } from '../../service/advance-payment/advance-payment.service';
import { AdvancePaymentController } from './advance-payment.controller';

@Module({
  controllers: [AdvancePaymentController],
  providers: [AdvancePaymentService],
})
export class AdvancePaymentModule {}
