import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { v4 as uuid } from "uuid";
import { MONGODB_DATABASE } from 'src/database';
import { CreateSiteDto } from 'src/resources/site/dto/create-site.dto';
import dayjs from 'dayjs';

@Injectable()
export class SiteDbService {
    private site = this.db.collection('sites');
    constructor(@Inject(MONGODB_DATABASE) private db: Db) { }

    async createSite(userId: string, site: CreateSiteDto) {
        const body = {
            id: uuid(),
            ...site,
            createdBy: userId,
            createdAt: dayjs(new Date()).toDate(),
            updatedAt: dayjs(new Date()).toDate(),
        };

        const _ = await this.site.insertOne(body);
        return body;
    }

    getListByOrganizationId(organizationId: string) {
        return this.site.find({ organizationId }).toArray();
    }

    getSiteById(id: string) {
        return this.site.findOne({ id });
    }

    updateSite(id: string, site: any) {
        return this.site.updateOne({ id }, { $set: site }, { upsert: false });
    }

    deleteById(id: string) {
        return this.site.deleteOne({ id });
    }
}
