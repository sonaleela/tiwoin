import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { MONGODB_DATABASE } from '../../database';
import dayjs from 'dayjs';

@Injectable()
export class OrganizationUserDbService {
    private organizationUsers = this.db.collection('organization-users');

    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    /**
     * Get an organization-users by filter
     * 
     * @param filter: { userId: string, organizationId: string }
     */
    async getOrganizationUser(filter: { userId: string, organizationId: string }) {
        return this.organizationUsers.findOne({ ...filter });
    }

    /**
     * Get list of organization-users by filter
     * 
     * @param filter: { phoneNumber?: string, userId?: string, organizationId?: string, isAccepted?: boolean }
     */
    async getOrganizationUserList(filter: { employeeId?: string, phoneNumber?: string, userId?: string, organizationId?: string, isAccepted?: boolean }) {
        let match = {};
        if (filter.userId && filter.phoneNumber) {
            const { phoneNumber, userId, ...rest } = filter;
            match = {
                $or: [
                    { phoneNumber, ...rest },
                    { userId, ...rest },
                ]
            };
        } else {
            match = { ...filter };
        }
        const pipeline: any[] = [{
            $match: {
                ...match,
            }
        }, {
            $lookup: {
                from: 'organizations',
                localField: 'organizationId',
                foreignField: 'id',
                as: 'organization'
            }
        }, {
            $unwind: '$organization'
        }, {
            $sort: {
                "createdAt": -1,
            },
        }];

        const data = await this.organizationUsers.aggregate(pipeline).toArray();
        return { data };
    }

    /**
     * Fetch organization user by phoneNumber and organizationId
     */
    getOrganizationUserById(id: string) {
        return this.organizationUsers.findOne({ id });
    }

    /**
     * Update organization-user
     * @param id 
     * @param params 
     */
    updateOrganizationUser(id: string, params: any) {
        return this.organizationUsers.findOneAndUpdate({
            id,
        }, {
            $set: {
                ...params,
                updatedAt: dayjs(new Date()).toDate(),
                ...(typeof params?.isAccepted === 'boolean' && { acceptedAt: dayjs(new Date()).toDate() }),
            },
        }, {
            returnDocument: 'after',
            upsert: false,
        });
    }

    deleteOrganizationUser(id: string) {
        return this.organizationUsers.deleteOne({ id });
    }
}
