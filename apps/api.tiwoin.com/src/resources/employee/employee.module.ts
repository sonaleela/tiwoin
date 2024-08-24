import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';

@Module({
    controllers: [EmployeeController],
    providers: []
})
export class EmployeeModule { }
