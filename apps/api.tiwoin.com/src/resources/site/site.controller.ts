import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { SiteService } from '../../service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('site')
export class SiteController {
    constructor(private readonly siteService: SiteService) { }

    /**
     * POST /site
     * Create a site
     * 
     * @param req 
     * @param createSiteDto 
     * @returns 
     */
    @Post()
    async create(@Request() req: any, @Body() createSiteDto: CreateSiteDto) {
        try {
            const userId = req?.user?.id;
            return await this.siteService.create(userId, createSiteDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /site?organization=:organization
     * Get site list for an organization
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    async findAll(@Query('organizationId') organizationId: string) {
        try {
            return await this.siteService.getListByOrganizationId(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /site/:id
     * Get single site by id
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.siteService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /site/:id
     * Update site by id
     * 
     * @param id 
     * @param updateSiteDto 
     * @returns 
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
        try {
            return this.siteService.update(id, updateSiteDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /site/:id
     * Delete site
     * 
     * @param id site id
     * @returns 
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            return this.siteService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
