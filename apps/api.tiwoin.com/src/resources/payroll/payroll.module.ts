import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';

@Module({
  controllers: [PayrollController],
  providers: []
})
export class PayrollModule {}
