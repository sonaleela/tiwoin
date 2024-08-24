import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import { CreatePayrollComponentDto } from 'src/resources/payroll-component/dto/create-payroll-component.dto';
import dayjs from 'dayjs';

@Injectable()
export class PayrollComponentDbService {
    private payrollComponent = this.db.collection('payroll-components');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async createPayrollComponent(userId: string, payrollComponent: CreatePayrollComponentDto) {
        const body = {
            id: uuid(),
            ...payrollComponent,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.payrollComponent.insertOne(body);
        return body;
    }

    getListByOrganizationId(organizationId: string) {
        return this.payrollComponent.find({ organizationId }).toArray();
    }

    deleteById(id: string) {
        return this.payrollComponent.deleteOne({ id });
    }
}
