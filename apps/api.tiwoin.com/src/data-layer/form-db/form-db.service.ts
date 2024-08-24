import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import { CreateFormDto } from 'src/resources/form/dto/create-form.dto';
import dayjs from "dayjs";

@Injectable()
export class FormDbService {
    private form = this.db.collection('forms');
    private formSubmissions = this.db.collection('form-submissions');
    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async createForm(userId: string, form: CreateFormDto) {
        const body = {
            id: uuid(),
            ...form,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.form.insertOne(body);
        return body;
    }

    getListByOrganizationId(organizationId: string) {
        return this.form.find({ organizationId }).toArray();
    }

    getFormById(id: string) {
        return this.form.findOne({ id });
    }

    deleteById(id: string) {
        return this.form.deleteOne({ id });
    }

    UpdateForm(id: string, form: any) {
        return this.form.updateOne({ id }, { $set: form }, { upsert: false });
    }

    /**
     * Get submitted work items for employee in the app
     * 
     * @param organizationId 
     * @param filter createdBy is required param and other optional are date
     */
    async getSubmissionListByUserId(organizationId: string, filter: any = {}) {
        const startDate = filter.date ? dayjs(filter.date, 'YYYY-MM-DD').startOf('day').toDate() : dayjs().startOf('day').toDate();
        const endDate = filter.date ? dayjs(filter.date, 'YYYY-MM-DD').endOf('day').toDate() : dayjs().endOf('day').toDate();

        const pipeline: any[] = [{
            $match: {
                organizationId,
                createdBy: filter.createdBy,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            }
        }, {
            $sort: {
                "createdAt": -1,
            },
        }];

        const data = await this.formSubmissions.aggregate(pipeline).toArray();
        return { data };
    }

    async submitForm(employeeId: string, form: any) {
        const body = {
            ...form,
            id: uuid(),
            createdBy: employeeId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        }
        const _ = await this.formSubmissions.insertOne(body);
        return body;
    }
}
