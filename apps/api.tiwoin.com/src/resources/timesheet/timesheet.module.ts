import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';

@Module({
  controllers: [TimesheetController],
  providers: []
})
export class TimesheetModule {}
