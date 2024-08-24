import { Inject, Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import { CreateOrganizationDto } from 'src/resources/organization/dto/create-organization.dto';
import dayjs from 'dayjs';

@Injectable()
export class OrganizationDBService {
    private organization = this.db.collection('organizations');
    private organizationUsers = this.db.collection('organization-users');
    private timeEntires = this.db.collection('time-entries');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    /**
     * Get organization by id
     * 
     * @param id 
     */
    getOrganizationById(id: string) {
        return this.organization.findOne({ id });
    }

    /**
     * Create and set owner of the organization
     * 
     * @param userId Owner of the organization
     * @param organization Organization object
     */
    async createOrganization(userId: string, organization: CreateOrganizationDto) {
        const body = {
            id: uuid(),
            ...organization,
            owners: [userId],
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };
        const _ = await this.organization.insertOne(body);
        return body;
    }

    /**
     * Add default time entry types eg. Office In, Office Out etc.
     * 
     * @param organizationId 
     */
    addDefaultTimeEntryTypes(organizationId: string) {
        const enteries = [{
            id: uuid(),
            isActive: true,
            isDefault: true,
            name: 'Office in',
            type: 'In',
            description: '',
            organizationId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        }, {
            id: uuid(),
            isActive: true,
            isDefault: true,
            name: 'Office Out',
            type: 'Out',
            description: '',
            organizationId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        }];

        return this.timeEntires.insertMany(enteries);
    }
}
