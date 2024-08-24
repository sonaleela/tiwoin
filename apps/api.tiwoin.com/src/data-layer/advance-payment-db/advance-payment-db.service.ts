import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';
import { Db } from 'mongodb';
import { MONGODB_DATABASE } from 'src/database';

@Injectable()
export class AdvancePaymentDbService {
    private advancePayments = this.db.collection('advance-payments');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    /**
     * Create a new payment entry
     * 
     * @param employeeId 
     * @param payload 
     */
    async create(employeeId: string, payload: any) {
        const body = {
            id: uuid(),
            employeeId,
            ...payload,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.advancePayments.insertOne(body);
        return body;
    }
}
