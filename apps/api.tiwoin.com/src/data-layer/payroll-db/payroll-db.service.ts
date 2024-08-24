import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { Db } from 'mongodb';
import { MONGODB_DATABASE } from 'src/database';
import { CreatePayrollDto } from 'src/resources/payroll/dto/create-payroll.dto';
import dayjs from 'dayjs';

@Injectable()
export class PayrollDbService {
    private payroll = this.db.collection('payroll');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async create(userId: string, payroll: CreatePayrollDto) {
        const body = {
            id: uuid(),
            ...payroll,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.payroll.insertOne(body);
        return body;
    }

    getListByOrganizationId(organizationId: string) {
        return this.payroll.find({ organizationId }).toArray();
    }

    getPayrollById(id: string) {
        return this.payroll.findOne({ id });
    }

    updatePayroll(id: string, payroll: any) {
        return this.payroll.updateOne({ id }, { $set: payroll }, { upsert: false });
    }

    deleteById(id: string) {
        return this.payroll.deleteOne({ id });
    }
}
