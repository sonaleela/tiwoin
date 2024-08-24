import { Controller, Get, Post, Body, Param, Request, ForbiddenException, Patch, Delete } from '@nestjs/common';
import { OrganizationService, UserService } from '../../service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly userService: UserService
    ) { }

    /**
     * POST /organization
     * 
     * Create new organization
     */
    @Post()
    async create(@Request() req: any, @Body() createOrganizationDto: CreateOrganizationDto) {
        try {
            const userId = req?.user?.id;
            return await this.organizationService.create(userId, createOrganizationDto);
        } catch (error) {
            throw new Error(error);
        }
    }
}
