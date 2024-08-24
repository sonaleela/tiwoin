import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import { CreateWorkItemDto } from 'src/resources/work-item/dto/create-work-item.dto';
import dayjs from "dayjs";

@Injectable()
export class WorkItemDbService {
    private workItems = this.db.collection('work-items');
    private workItemSubmissions = this.db.collection('work-item-submissions');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async createWorkItem(userId: string, workItems: CreateWorkItemDto) {
        const body = {
            id: uuid(),
            ...workItems,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        }
        const _ = await this.workItems.insertOne(body);
        return body;
    }

    async getListByOrganizationId(organizationId: string) {
        return this.workItems.find({ organizationId }).toArray();
    }

    async getWorkItemById(id: string) {
        return this.workItems.findOne({ id });
    }

    updateWorkItem(id: string, workItem: any) {
        return this.workItems.updateOne({ id }, { $set: workItem }, { upsert: false });
    }

    deleteById(id: string) {
        return this.workItems.deleteOne({ id });
    }

    /**
     * Get submitted work items for employee in the app
     * 
     * @param organizationId 
     * @param filter createdBy is required param and other optional are date
     */
    async getSubmissionListByUserId(organizationId: string, filter: any = {}) {
        const startDate = filter.date ? dayjs(filter.date).startOf('day').toDate() : dayjs().startOf('day').toDate();
        const endDate = filter.date ? dayjs(filter.date).endOf('day').toDate() : dayjs().endOf('day').toDate();

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

        const data = await this.workItemSubmissions.aggregate(pipeline).toArray();
        return { data };
    }

    /**
     * Submit work item
     * 
     * @param employeeId 
     * @param workItem 
     */
    async submitWorkItem(employeeId: string, workItem: any) {
        const body = {
            ...workItem,
            id: uuid(),
            createdBy: employeeId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        }
        const _ = await this.workItemSubmissions.insertOne(body);
        return body;
    }
}
