import { Injectable } from '@nestjs/common';
import { OrganizationDBService, OrganizationUserDbService, UserDbService } from '../../data-layer';
import { CreateOrganizationDto } from '../../resources/organization/dto/create-organization.dto';

@Injectable()
export class OrganizationService {
    constructor(
        private organizationService: OrganizationDBService,
        private organizationUserService: OrganizationUserDbService,
        private userService: UserDbService,
    ) { }

    /**
     * Create an organization object
     * Also add organization-user as OWNER of the organization
     * 
     * @param userId User that creates the organization, it's added as owner of the organization
     * @param createOrganizationDto 
     * @returns 
     */
    async create(userId: string, createOrganizationDto: CreateOrganizationDto) {
        const organization = await this.organizationService.createOrganization(userId, createOrganizationDto);
        await this.organizationService.addDefaultTimeEntryTypes(organization.id);
        await this.userService.createOrganizationUser({ userId, organizationId: organization.id, role: 'OWNER' }, true);
        await this.userService.addOrganizationIfNotExist(userId, organization.id);
        return organization;
    }
}
