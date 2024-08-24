import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { EmployeeService, WorkItemService } from '../../service';
import { CreateWorkItemDto } from './dto/create-work-item.dto';
import { UpdateWorkItemDto } from './dto/update-work-item.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('work-item')
export class WorkItemController {
    constructor(
        private readonly workItemService: WorkItemService,
        private readonly employeeService: EmployeeService,
    ) { }

    /**
     * POST /work-item
     * Create work-item
     * 
     * @param req 
     * @param createWorkItemDto 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'CreateWorkItem' })
    async create(@Request() req: any, @Body() createWorkItemDto: CreateWorkItemDto) {
        try {
            const userId = req?.user?.id;
            return await this.workItemService.create(userId, createWorkItemDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /work-item?organization=:organization
     * Get list of sites for an organization
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListWorkItem' })
    findAll(@Query('organizationId') organizationId: string) {
        try {
            return this.workItemService.getListByOrganizationId(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /work-item/submission/:organizationId
     * Get list of work-item submission for employee
     * 
     * @param req 
     * @param organizationId 
     * @param filter 
     */
    @Get('submission/:organizationId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListWorkItemSubmissions' })
    async findSubmission(@Request() req: any, @Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(organizationId, userId);
            return this.workItemService.getSubmissionListByUserId(organizationId, { ...filter, createdBy: employee?.id });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * POST /work-item/submission
     * Submit a work-item by employee
     * 
     * @param req 
     * @param submitWorkItemDto 
     * @returns 
     */
    @Post('submission')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'SubmitWorkItem' })
    async submitWorkItem(@Request() req: any, @Body() submitWorkItemDto: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(submitWorkItemDto?.organizationId, userId);
            return await this.workItemService.submitWorkItem(employee?.id, submitWorkItemDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /work-item/:id
     * Get a work-item by id
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetWorkItem' })
    async findOne(@Param('id') id: string) {
        try {
            return await this.workItemService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /work-item/:id
     * Update work-item by id
     * 
     * @param id 
     * @param updateWorkItemDto 
     * @returns 
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'UpdateWorkItem' })
    async update(@Param('id') id: string, @Body() updateWorkItemDto: UpdateWorkItemDto) {
        try {
            return await this.workItemService.update(id, updateWorkItemDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /work-item/:id
     * Delete work item by id
     * 
     * @param id work item id
     * @returns 
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'DeleteWorkItem' })
    remove(@Param('id') id: string) {
        try {
            return this.workItemService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
