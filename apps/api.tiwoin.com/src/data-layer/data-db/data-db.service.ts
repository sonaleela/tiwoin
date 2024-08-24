import { Inject, Injectable } from '@nestjs/common';
import { MONGODB_DATABASE } from 'src/database';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { calculateTotalTime } from 'src/shared';
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import utc from "dayjs/plugin/utc";

dayjs.extend(isToday);
dayjs.extend(utc)

@Injectable()
export class DataDbService {
    private formSubmissions = this.db.collection('form-submissions');
    private timesheetSubmissions = this.db.collection('timesheet-submissions');
    private workItemSubmissions = this.db.collection('work-item-submissions');
    private payrollSubmissions = this.db.collection('payroll-submissions');
    private advancePayments = this.db.collection('advance-payments');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    /**
     * Fetch forms data for given organization id and filter
     * 
     * @param organizationId 
     * @param filter 
     */
    async getFormsByFilter(organizationId: string, filter: any): Promise<{ data: any[], total: number }> {
        const currentDate = new Date();
        let startDate = filter?.startDate;
        let endDate = filter?.endDate;
        // If startDate is missing, set it to midnight of the current day
        if (!startDate) {
            startDate = new Date(currentDate);
            startDate.setHours(0, 0, 0, 0);
        } else {
            startDate = new Date(startDate);
        }
        // If endDate is missing, set it to the current date and time
        if (!endDate) {
            endDate = new Date(currentDate);
        } else {
            endDate = new Date(endDate);
        }

        const pipeline: any[] = [{
            $match: {
                organizationId,
                updatedAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            },
        }, {
            $lookup: {
                from: 'employees',
                localField: 'createdBy',
                foreignField: 'id',
                as: 'employee',
            }
        }, {
            $unwind: {
                path: '$employee',
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'approvedBy',
                foreignField: 'id',
                as: 'approvedBy',
            }
        }, {
            $unwind: {
                path: '$approvedBy',
                preserveNullAndEmptyArrays: true,
            }
        }];

        // Add sorting
        if (filter?.sortBy && filter?.direction) {
            const sortStage = {
                $sort: {
                    [filter?.sortBy]: filter?.direction === 'asc' ? 1 : -1,
                },
            };
            pipeline.push(sortStage);
        } else {
            const sortStage = {
                $sort: {
                    "createdAt": -1,
                },
            };
            pipeline.push(sortStage);
        }

        // Calculate skip and limit  based on pagination parameters
        const limit = filter?.limit || 10;
        const skip = (filter?.page || 0) * limit;
        pipeline.push({
            $skip: skip,
        });
        pipeline.push({
            $limit: limit,
        });

        const totalCountPipeline = [...pipeline];
        totalCountPipeline.pop(); // remove $skip step
        totalCountPipeline.pop(); // remove $limit step

        const totalDocs = await this.formSubmissions.aggregate(totalCountPipeline).toArray();
        const data = await this.formSubmissions.aggregate(pipeline).toArray();

        return { total: totalDocs.length, data };
    }

    /**
     * Update
     * @param id 
     * @param data 
     */
    async updateFormData(id: string, data: any) {
        return this.formSubmissions.findOneAndUpdate(
            { id },
            {
                $set: {
                    ...data,
                    approvedOn: dayjs(new Date()).toDate(),
                },
            },
            { upsert: false, returnDocument: 'after' },
        );
    }

    /**
     * Fetch timesheet data for given organization id and filter
     * @param organizationId 
     * @param filter 
     */
    async getTimesheetByFilter(organizationId: string, filter: any): Promise<{ data: any[], total: number }> {
        const date = filter.date ? new Date(filter.date) : new Date();
        const startDate = dayjs(date).startOf('day').toDate();
        const endDate = dayjs(date).endOf('day').toDate();

        const pipeline: any[] = [{
            $match: {
                organizationId,
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },
        }, {
            $lookup: {
                from: 'employees',
                localField: 'employeeId',
                foreignField: 'id',
                as: 'employee'
            }
        }, {
            $unwind: '$employee'
        }];

        // Add sorting
        if (filter?.sortBy && filter?.direction) {
            const sortStage = {
                $sort: {
                    [filter?.sortBy]: filter?.direction === 'asc' ? 1 : -1,
                },
            };
            pipeline.push(sortStage);
        } else {
            const sortStage = {
                $sort: {
                    "createdAt": -1,
                },
            };
            pipeline.push(sortStage);
        }

        // Calculate skip and limit  based on pagination parameters
        const limit = filter?.limit || 10;
        const skip = (filter?.page || 0) * limit;
        pipeline.push({
            $skip: skip,
        });
        pipeline.push({
            $limit: limit,
        });

        const totalCountPipeline = [...pipeline];
        totalCountPipeline.pop(); // remove $skip step
        totalCountPipeline.pop(); // remove $limit step

        const totalDocs = await this.timesheetSubmissions.aggregate(totalCountPipeline).toArray();
        const results = await this.timesheetSubmissions.aggregate(pipeline).toArray();

        const data = results.map((result) => {
            const totalTime = calculateTotalTime(result.entries, result.date);
            return {
                ...result,
                totalTime: totalTime
            };
        });
        return { total: totalDocs.length, data };
    }

    /**
     * Get timesheet data by id
     * 
     * @param id 
     * @returns 
     */
    async getTimesheetById(id: string) {
        const timesheets = await this.timesheetSubmissions.aggregate([{
            $match: { id }
        },
        {
            $lookup: {
                from: 'employees',
                localField: 'employeeId',
                foreignField: 'id',
                as: 'employee',
            },
        }, {
            $unwind: '$employee'
        }]).toArray();
        if (timesheets.length) return timesheets[0];
        return {};
    }

    /**
     * Update timesheet data record
     * 
     * @param id 
     * @param payload 
     */
    updateTimesheetById(id: string, payload: { entries: any[], userId: string }) {
        return this.timesheetSubmissions.findOneAndUpdate(
            { id },
            [{
                $set: {
                    entriesHistory: {
                        $concatArrays: [
                            [{
                                date: { $cond: [{ $not: ["$updatedAt"] }, "$createdAt", "$updatedAt"] },
                                updatedBy: { $cond: [{ $not: ["$updatedBy"] }, "", "$updatedBy"] },
                                entries: '$entries',
                            }],
                            { $cond: [{ $not: ["$entriesHistory"] }, [], "$entriesHistory"] }
                        ]
                    },
                }
            },
            {
                $set: {
                    entries: payload.entries,
                    updatedBy: payload.userId,
                    updatedAt: dayjs(new Date()).toDate(),
                }
            }],
            { upsert: false, returnDocument: 'after' },
        );
    }

    /**
     * Fetch timesheet data for given organization id and filter
     * @param organizationId 
     * @param filter 
     */
    async getAdvancePaymentFilter(organizationId: string, filter: any): Promise<{ data: any[], total: number }> {
        const pipeline: any[] = [{
            $match: {
                organizationId,
                ...(filter?.employeeId && { employeeId: filter.employeeId }),
            },
        }, {
            $lookup: {
                from: 'employees',
                localField: 'employeeId',
                foreignField: 'id',
                as: 'employee',
            }
        }, {
            $unwind: '$employee'
        }];

        // Add sorting
        if (filter?.sortBy && filter?.direction) {
            const sortStage = {
                $sort: {
                    [filter?.sortBy]: filter?.direction === 'asc' ? 1 : -1,
                },
            };
            pipeline.push(sortStage);
        } else {
            const sortStage = {
                $sort: {
                    "createdAt": -1,
                },
            };
            pipeline.push(sortStage);
        }

        // Calculate skip and limit based on pagination parameters
        const limit = filter?.limit || 10;
        const skip = (filter?.page || 0) * limit;
        pipeline.push({
            $skip: skip,
        });
        pipeline.push({
            $limit: limit,
        });

        const totalCountPipeline = [...pipeline];
        totalCountPipeline.pop(); // remove $skip step
        totalCountPipeline.pop(); // remove $limit step

        const totalDocs = await this.advancePayments.aggregate(totalCountPipeline).toArray();
        const data = await this.advancePayments.aggregate(pipeline).toArray();

        return { total: totalDocs.length, data };
    }

    /**
     * Get work-item data by id
     * 
     * @param id 
     * @returns 
     */
    async getWorkItemById(id: string) {
        const workItems = await this.workItemSubmissions.aggregate([{
            $match: { id }
        },
        {
            $lookup: {
                from: 'employees',
                localField: 'createdBy',
                foreignField: 'id',
                as: 'employee',
            },
        }, {
            $unwind: '$employee'
        }]).toArray();

        if (workItems.length) return workItems[0];
        return {};
    }

    /**
     * Fetch work item data for given organization id and filter
     * @param organizationId 
     * @param filter 
     */
    async getWorkItemsByFilter(organizationId: string, filter: any): Promise<{ data: any[], total: number }> {
        let startDate = filter?.startDate;
        let endDate = filter?.endDate;

        // If startDate is missing, set it to midnight of the current day
        if (startDate) {
            startDate = dayjs(startDate).startOf('day').toDate();
        } else {
            startDate = dayjs().startOf('day').toDate();
        }
        // If endDate is missing, set it to the current date and time
        if (endDate) {
            endDate = dayjs(endDate).toDate();
        } else {
            endDate = dayjs().toDate();
        }

        const pipeline: any[] = [{
            $match: {
                organizationId,
                updatedAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            },
        }, {
            $lookup: {
                from: 'employees',
                localField: 'createdBy',
                foreignField: 'id',
                as: 'employee',
            }
        }, {
            $unwind: {
                path: '$employee',
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: 'sites',
                localField: 'siteId',
                foreignField: 'id',
                as: 'site',
            }
        }, {
            $unwind: {
                path: '$site',
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'approvedBy',
                foreignField: 'id',
                as: 'approvedBy',
            }
        }, {
            $unwind: {
                path: '$approvedBy',
                preserveNullAndEmptyArrays: true,
            }
        }];

        // Add sorting
        if (filter?.sortBy && filter?.direction) {
            const sortStage = {
                $sort: {
                    [filter?.sortBy]: filter?.direction === 'asc' ? 1 : -1,
                },
            };
            pipeline.push(sortStage);
        } else {
            const sortStage = {
                $sort: {
                    "createdAt": -1,
                },
            };
            pipeline.push(sortStage);
        }

        // Calculate skip and limit  based on pagination parameters
        const limit = filter?.limit || 10;
        const skip = (filter?.page || 0) * limit;
        pipeline.push({
            $skip: skip,
        });
        pipeline.push({
            $limit: limit,
        });

        const totalCountPipeline = [...pipeline];
        totalCountPipeline.pop(); // remove $skip step
        totalCountPipeline.pop(); // remove $limit step

        const totalDocs = await this.workItemSubmissions.aggregate(totalCountPipeline).toArray();
        const data = await this.workItemSubmissions.aggregate(pipeline).toArray();

        return { total: totalDocs.length, data };
    }

    /**
     * Update work-item data record
     * 
     * @param id 
     * @param payload 
     */
    updateWorkItemById(id: string, payload: { quantity: string, userId: string, updatedAt?: string }) {
        return this.workItemSubmissions.findOneAndUpdate(
            { id },
            [{
                $set: {
                    entriesHistory: {
                        $concatArrays: [
                            [{
                                recordUpdatedAt: dayjs(new Date()).toDate(),
                                updatedAt: '$updatedAt',
                                updatedBy: { $cond: [{ $not: ["$updatedBy"] }, "", "$updatedBy"] },
                                quantity: '$quantity',
                            }],
                            { $cond: [{ $not: ["$history"] }, [], "$history"] }
                        ]
                    },
                }
            },
            {
                $set: {
                    quantity: payload.quantity,
                    updatedBy: payload.userId,
                    ...(payload.updatedAt && { updatedAt: payload.updatedAt }),
                }
            }],
            { upsert: false, returnDocument: 'after' },
        );
    }

    /**
     * Update
     * @param id 
     * @param data 
     */
    async updateWorkItemData(id: string, data: any) {
        return this.workItemSubmissions.findOneAndUpdate(
            { id },
            {
                $set: {
                    ...data,
                    approvedOn: dayjs(new Date()).toDate(),
                },
            },
            { upsert: false, returnDocument: 'after' },
        );
    }

    payrollFilter(filter: any) {
        return this.payrollSubmissions.find({
            organizationId: filter?.organizationId,
        }).toArray();
    }

    /**
     * Add timesheet data
     * 
     * @param organizationId 
     * @param body 
     */
    async addTimesheet(organizationId: string, employeeId: string, body: any) {
        const { date } = body;

        const isTimesheetExist = await this.timesheetSubmissions.findOne({
            $and: [
                { employeeId },
                { organizationId },
                {
                    date: {
                        $gte: dayjs(date).startOf('day').toDate(),
                        $lte: dayjs(date).startOf('day').toDate(),
                    }
                }
            ]
        });

        if (isTimesheetExist) throw new Error(`Entry for ${dayjs(date).format('YYYY MM DD')} already exist`);

        const startDate = dayjs(date).startOf('day').toDate();
        const endDate = dayjs(date).endOf('day').toDate();
        const id = uuid();

        return this.timesheetSubmissions.updateOne({
            $and: [
                { employeeId },
                { date: { $gte: startDate, $lte: endDate } },
            ],
        }, {
            $set: {
                ...body,
                employeeId,
                organizationId,
                date: dayjs(new Date(body.date)).toDate(),
                updatedAt: dayjs(new Date()).toDate(),
            },
            $setOnInsert: {
                id,
                createdAt: dayjs(new Date()).toDate(),
            },
        }, {
            upsert: true,
        });
    }
}
