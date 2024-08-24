import { Module } from '@nestjs/common';
import { PayrollComponentController } from './payroll-component.controller';

@Module({
  controllers: [PayrollComponentController],
  providers: []
})
export class PayrollComponentModule {}
