import { Module } from '@nestjs/common';
import { WorkItemController } from './work-item.controller';

@Module({
  controllers: [WorkItemController],
  providers: []
})
export class WorkItemModule {}
