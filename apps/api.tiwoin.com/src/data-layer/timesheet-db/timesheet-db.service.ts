import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { MONGODB_DATABASE } from 'src/database';
import { CreateTimesheetDto } from 'src/resources/timesheet/dto/create-timesheet.dto';
import { calculateTotalTime } from 'src/shared';
dayjs.extend(isToday);

@Injectable()
export class TimesheetDbService {
    private timeEntires = this.db.collection('time-entries');
    private timesheetSubmission = this.db.collection('timesheet-submissions');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async createTimesheet(userId: string, timesheet: CreateTimesheetDto) {
        const body = {
            id: uuid(),
            ...timesheet,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.timeEntires.insertOne(body);
        return body;
    }

    /**
     * Get entry types list
     * 
     * @param organizationId 
     * @returns 
     */
    getListByOrganizationId(organizationId: string) {
        return this.timeEntires.find({ organizationId }).toArray();
    }

    /**
     * Get submitted timesheet for employee in the app
     * 
     * @param organizationId 
     * @param filter createdBy is required param and other optional are date
     */
    async getListByFilter(organizationId: string, filter: any = {}) {
        const startDate = filter.date ? dayjs(filter.date, 'YYYY-MM').startOf('month').toDate() : dayjs().startOf('month').toDate();
        const endDate = filter.date ? dayjs(filter.date, 'YYYY-MM').endOf('month').toDate() : dayjs().endOf('month').toDate();

        const pipeline: any[] = [{
            $match: {
                organizationId,
                employeeId: filter.employeeId,
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }
        }, {
            $sort: {
                "date": -1,
            },
        }];

        const results = await this.timesheetSubmission.aggregate(pipeline).toArray();
        const data = results.map((result) => {
            const totalTime = calculateTotalTime(result.entries, result.date);
            return {
                ...result,
                totalTime: totalTime
            };
        });
        return { data };
    }

    /**
     * Get submitted timesheet for employee in the app
     * 
     * @param organizationId 
     * @param filter createdBy is required param and other optional are date
     */
    async getClockTime(organizationId: string, filter: any = {}) {
        const startDate = dayjs().startOf('day').toDate();
        const endDate = dayjs().endOf('day').toDate();

        const pipeline: any[] = [{
            $match: {
                organizationId,
                employeeId: filter.employeeId,
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }
        }, {
            $sort: {
                "date": -1,
            },
        }, {
            $limit: 1,
        }];

        const results = await this.timesheetSubmission.aggregate(pipeline).toArray();
        if (!results[0]) return { data: {} };

        const totalTime = calculateTotalTime(results[0]?.entries, results[0]?.date);
        return { data: { ...results[0], totalTime } };
    }

    getTimesheetById(id: string) {
        return this.timeEntires.findOne({ id });
    }

    deleteById(id: string) {
        return this.timeEntires.deleteOne({ id });
    }

    updateTimesheet(id: string, timesheet: any) {
        return this.timeEntires.updateOne({ id }, { $set: timesheet }, { upsert: false });
    }

    getTimesheetSubmission(employeeId: string, date: string) {
        return this.timesheetSubmission.findOne({
            $and: [{ employeeId }, { date }]
        })
    }

    putTimesheetSubmission(employeeId: string, body: any) {
        const startDate = dayjs().startOf('day').toDate();
        const endDate = dayjs().endOf('day').toDate();

        const id = uuid();

        return this.timesheetSubmission.updateOne({
            $and: [
                { employeeId },
                { date: { $gte: startDate, $lte: endDate } },
            ],
        }, {
            $set: {
                ...body,
                date: dayjs(new Date(body.date)).toDate(),
                updatedAt: dayjs(new Date()).toDate(),
            },
            $setOnInsert: {
                id,
                createdBy: employeeId,
                createdAt: dayjs(new Date()).toDate(),
            },
            $addToSet: { entries: body?.entry },
        }, {
            upsert: true,
        });
    }

    /**
     * Get submitted timesheet for employee in the app
     * 
     * @param organizationId 
     * @param filter createdBy is required param and other optional are date
     */
    async getTimesheetByFilter(filter: { employeeId?: string, date?: string, organizationId?: string } = {}) {
        let date;
        if (filter.date) {
            const startDate = dayjs().startOf('day').toDate();
            const endDate = dayjs().endOf('day').toDate();
            date = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        const pipeline: any[] = [{
            $match: {
                ...(filter?.organizationId && { organizationId: filter?.organizationId }),
                ...(filter?.employeeId && { employeeId: filter?.employeeId }),
                ...(filter?.date && { date }),
            }
        }, {
            $sort: {
                "date": -1,
            },
        }, {
            $limit: 1,
        }];

        const results = await this.timesheetSubmission.aggregate(pipeline).toArray();
        if (!results[0]) return { data: {} };

        const totalTime = calculateTotalTime(results[0]?.entries, results[0]?.date);
        return { data: { ...results[0], totalTime } };
    }
}
