import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import dayjs from 'dayjs';

@Injectable()
export class UserDbService {
    private users = this.db.collection('users');
    private organizationUsers = this.db.collection('organization-users');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    /**
     * Update(create) user with payload
     * 
     * @param id user id
     * @param payload 
     */
    update(id: string, payload: any) {
        return this.users.findOneAndUpdate({
            $or: [{ id }, { 'phoneNumber': payload?.phoneNumber }]
        }, {
            $set: {
                ...payload,
                updatedAt: dayjs(new Date()).toDate(),
            },
            $setOnInsert: {
                createdAt: dayjs(new Date()).toDate(),
            }
        }, {
            upsert: true,
        });
    }

    updateUser(id: string, params: any) {
        return this.users.findOneAndUpdate({
            id
        }, {
            $set: {
                ...params,
                updatedAt: dayjs(new Date()).toDate(),
            },
        }, {
            returnDocument: 'after',
        });
    }

    addOrganizationIfNotExist(id: string, defaultOrganization: any) {
        return this.users.findOneAndUpdate({
            id,
            defaultOrganization: { $exists: false },
        }, {
            $set: {
                defaultOrganization,
                updatedAt: dayjs(new Date()).toDate(),
            },
        }, {
            returnDocument: 'after',
        });
    }

    /**
     * Get user by id
     * 
     * @param id 
     */
    getUserById(id: string) {
        return this.users.findOne({ id });
    }

    async createUser(user: any) {
        const body = {
            ...user,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.users.insertOne(body);
        return body;
    }

    getUserByPhone(phoneNumber: string) {
        return this.users.findOne({ phoneNumber });
    }

    /**
     * Fetch organization user by phoneNumber and organizationId
     */
    getUserByPhoneNumberAndOrganizationId(phoneNumber: string, organizationId: string) {
        return this.organizationUsers.findOne({ phoneNumber, organizationId });
    }

    /**
     * Add an invitation record for user invitation for an organization
     * 
     * @param request 
     */
    async createOrganizationUser(request: any, isAccepted: boolean = false) {
        const body = {
            id: uuid(),
            ...request,
            isAccepted,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.organizationUsers.insertOne(body);
        return body;
    }
}
