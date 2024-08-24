import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateEmployeeDto } from 'src/resources/employee/dto/create-employee.dto';
import { MONGODB_DATABASE } from 'src/database';
import { Db } from 'mongodb';
import dayjs from 'dayjs';

@Injectable()
export class EmployeeDbService {
    private employee = this.db.collection('employees');
    private invitations = this.db.collection('invitation-organization');
    private employeeDocuments = this.db.collection('employee-documents');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    addInvitation(invitation: any) {
        const body = {
            id: uuid(),
            ...invitation,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };
        return this.invitations.insertOne(body);
    }

    getInvitationsByPhoneNumber(phoneNumber: string) {
        return this.invitations.find({ phoneNumber }).toArray();
    }

    removeInvitations(phoneNumber: string) {
        return this.invitations.deleteMany({ phoneNumber });
    }

    async createEmployee(userId: string, employee: CreateEmployeeDto) {
        const body = {
            id: uuid(),
            ...employee,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.employee.insertOne(body);
        return body;
    }

    getListByOrganizationId(organizationId: string) {
        return this.employee.find({ organizationId }).toArray();
    }

    async getEmployees(filter: { organizationId: string, searchString: string }) {
        const pipeline: any[] = [{
            $match: {
                organizationId: filter.organizationId,
            },
        }];
        if (filter.searchString) {
            pipeline.unshift({
                $search: {
                    index: "employee",
                    text: {
                        query: filter.searchString,
                        path: {
                            wildcard: "*"
                        },
                        fuzzy: {},
                    },
                },
            });
        }
        const data = await this.employee.aggregate(pipeline).toArray();
        return { total: data.length, data };
    }

    getEmployeeByOrganizationAndUserId(organizationId: string, userId: string) {
        return this.employee.findOne({ organizationId, userId });
    }

    getEmployeeById(id: string) {
        return this.employee.findOne({ id });
    }

    getEmployeeByUserAndOrganizationId(id: string) {
        return this.employee.findOne({ id });
    }

    getEmployeeByPhoneNumberAndOrganization(phoneNumber: string, organizationId: string) {
        return this.employee.findOne({ phoneNumber, organizationId });
    }

    updateEmployee(id: string, employee: any) {
        return this.employee.findOneAndUpdate(
            { id },
            { $set: employee },
            { upsert: false, returnDocument: 'after' },
        );
    }

    deleteById(id: string) {
        return this.employee.deleteOne({ id });
    }

    async requestDocument(employeeId: string, requestUserId: string, documentRequest: any) {
        const body = {
            id: uuid(),
            ...documentRequest,
            requestedBy: requestUserId,
            employeeId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };
        const _ = await this.employeeDocuments.insertOne(body);
        return body;
    }

    async updateDocument(id: string, documentBody: any) {
        return this.employeeDocuments.updateOne({ id }, { $set: documentBody }, { upsert: false });
    }

    getDocumentListByEmployeeId(employeeId: string) {
        return this.employeeDocuments.find({ employeeId }).toArray();
    }
}
